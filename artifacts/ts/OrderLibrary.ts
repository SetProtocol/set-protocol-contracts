export const OrderLibrary = 
{
  "contractName": "OrderLibrary",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_orderHash",
          "type": "bytes32"
        },
        {
          "name": "_signerAddress",
          "type": "address"
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
        }
      ],
      "name": "validateSignature",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_principal",
          "type": "uint256"
        },
        {
          "name": "_numerator",
          "type": "uint256"
        },
        {
          "name": "_denominator",
          "type": "uint256"
        }
      ],
      "name": "getPartialAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x610435610030600b82828239805160001a6073146000811461002057610022565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600436106100625763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166398024a8b8114610067578063ef4b688f14610097575b600080fd5b81801561007357600080fd5b506100856004356024356044356100db565b60408051918252519081900360200190f35b6100c760043573ffffffffffffffffffffffffffffffffffffffff6024351660ff60443516606435608435610242565b604080519115158252519081900360200190f35b6000806000838015156100ea57fe5b858709915081151561011d576101168461010a888863ffffffff6103c516565b9063ffffffff6103f416565b9250610239565b610143610130868863ffffffff6103c516565b61010a84620f424063ffffffff6103c516565b60408051808201909152601981527f526f756e64696e67206572726f7220746f6f206c617267652e0000000000000060208201529091506103e88210610221576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156101e65781810151838201526020016101ce565b50505050905090810190601f1680156102135780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506102368461010a888863ffffffff6103c516565b92505b50509392505050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b602083106102b55780518252601f199092019160209182019101610296565b51815160209384036101000a600019018019909216911617905292019384525060408051808503815293820190819052835193945092839250908401908083835b602083106103155780518252601f1990920191602091820191016102f6565b51815160209384036101000a60001901801990921691161790526040805192909401829003822060008084528383018087529190915260ff8e1683860152606083018d9052608083018c9052935160a08084019750919550601f1981019492819003909101925090865af1158015610391573d6000803e3d6000fd5b5050604051601f19015173ffffffffffffffffffffffffffffffffffffffff90811698169790971498975050505050505050565b60008215156103d6575060006103ee565b508181028183828115156103e657fe5b04146103ee57fe5b92915050565b6000818381151561040157fe5b0493925050505600a165627a7a7230582012e2625e38061a6b6a5dbc53cc00bad4f10bf26080af143bac91d3b539f4c7b30029",
  "deployedBytecode": "0x73000000000000000000000000000000000000000030146080604052600436106100625763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166398024a8b8114610067578063ef4b688f14610097575b600080fd5b81801561007357600080fd5b506100856004356024356044356100db565b60408051918252519081900360200190f35b6100c760043573ffffffffffffffffffffffffffffffffffffffff6024351660ff60443516606435608435610242565b604080519115158252519081900360200190f35b6000806000838015156100ea57fe5b858709915081151561011d576101168461010a888863ffffffff6103c516565b9063ffffffff6103f416565b9250610239565b610143610130868863ffffffff6103c516565b61010a84620f424063ffffffff6103c516565b60408051808201909152601981527f526f756e64696e67206572726f7220746f6f206c617267652e0000000000000060208201529091506103e88210610221576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156101e65781810151838201526020016101ce565b50505050905090810190601f1680156102135780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506102368461010a888863ffffffff6103c516565b92505b50509392505050565b60008060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600181896040516020018083805190602001908083835b602083106102b55780518252601f199092019160209182019101610296565b51815160209384036101000a600019018019909216911617905292019384525060408051808503815293820190819052835193945092839250908401908083835b602083106103155780518252601f1990920191602091820191016102f6565b51815160209384036101000a60001901801990921691161790526040805192909401829003822060008084528383018087529190915260ff8e1683860152606083018d9052608083018c9052935160a08084019750919550601f1981019492819003909101925090865af1158015610391573d6000803e3d6000fd5b5050604051601f19015173ffffffffffffffffffffffffffffffffffffffff90811698169790971498975050505050505050565b60008215156103d6575060006103ee565b508181028183828115156103e657fe5b04146103ee57fe5b92915050565b6000818381151561040157fe5b0493925050505600a165627a7a7230582012e2625e38061a6b6a5dbc53cc00bad4f10bf26080af143bac91d3b539f4c7b30029",
  "sourceMap": "856:6098:16:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
  "deployedSourceMap": "856:6098:16:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6170:782;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;6170:782:16;;;;;;;;;;;;;;;;;;;;;;;;;5141:647;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6170:782;6313:7;6407:14;6665:30;6455:12;6424:44;;;;;;;6443:10;6431;6424:44;6407:61;-1:-1:-1;6525:14:16;;6521:96;;;6562:44;6593:12;6562:26;:10;6577;6562:26;:14;:26;:::i;:::-;:30;:44;:30;:44;:::i;:::-;6555:51;;;;6521:96;6698:54;6725:26;:10;6740;6725:26;:14;:26;:::i;:::-;6698:22;:9;6712:7;6698:22;:13;:22;:::i;:54::-;6859:24;;;;;;;;;;;;;;;;;6665:87;;-1:-1:-1;6853:4:16;6825:32;;6817:67;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;6817:67:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;6901:44:16;6932:12;6901:26;:10;6916;6901:26;:14;:26;:::i;:44::-;6894:51;;6170:782;;;;;;;;:::o;5141:647::-;5338:4;5415:18;5475:22;:59;;;;;;;;;;;;;;;;;;;;5604:131;5654:9;5665:10;5637:39;;;;;;;;;;;;;;;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;365:33;;5637:39:16;;;;;-1:-1:-1;5637:39:16;;;26:21:-1;;;6:49;;5637:39:16;;;;;;;5627:50;;5637:39;;-1:-1:-1;5637:39:16;;;-1:-1:-1;5627:50:16;;;;;5637:39;5627:50;36:153:-1;66:2;58:11;;36:153;;176:10;;164:23;;-1:-1;;139:12;;;;98:2;89:12;;;;114;36:153;;;299:10;344;;263:2;259:12;;;254:3;250:22;-1:-1;;246:30;311:9;;295:26;;;340:21;;377:20;365:33;;5627:50:16;;;;;;;;;;;;-1:-1:-1;5604:131:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;263:2;;-1:-1;;;5604:131:16;;;;;;;;;;;-1:-1:-1;5604:131:16;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;5604:131:16;;-1:-1:-1;;5604:131:16;;5753:28;;;;;;;;;;;5141:647;-1:-1:-1;;;;;;;;5141:647:16:o;203:373:19:-;261:9;487:6;;483:35;;;-1:-1:-1;510:1:19;503:8;;483:35;-1:-1:-1;528:5:19;;;532:1;528;:5;546;;;;;;;;:10;539:18;;;;203:373;;;;:::o;658:272::-;716:7;924:1;920;:5;;;;;;;;;658:272;-1:-1:-1;;;658:272:19:o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\n\n\n/**\n * @title OrderLibrary\n * @author Set Protocol\n *\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n *\n */\n\nlibrary OrderLibrary {\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n    \n    string constant ROUNDING_ERROR_TOO_LARGE = \"Rounding error too large.\";\n\n    /* ============ Structs ============ */\n\n    /**\n     * Struct containing all parameters for the issuance order\n     *\n     * @param  setAddress                   Set the maker wants to mint\n     * @param  makerAddress                 Address of maker of the Issuance Order\n     * @param  makerToken                   Address of token maker wants to exchange for filling issuance order\n     * @param  relayerAddress               Address of relayer\n     * @param  relayerToken                 Token relayer wants to be compensated in\n     * @param  quantity                     Amount of Sets maker is looking to mint\n     * @param  makerTokenAmount             Amount of makerToken to be used to fill the order\n     * @param  expiration                   Timestamp marking when the order expires\n     * @param  relayerTokenAmount           Amount of tokens relayer wants to be compensated\n     * @param  salt                         Random number used to create unique orderHash\n     * @param  requiredComponents           Components to be acquired by taker's exchange orders\n     * @param  requiredComponentAmounts     Amounts of each component to be acquired by exchange order\n     * @param  orderHash                    Unique order identifier used to log information about the order in the protocol\n     */\n    struct IssuanceOrder {\n        address setAddress;                 // _addresses[0]\n        address makerAddress;               // _addresses[1]\n        address makerToken;                 // _addresses[2]\n        address relayerAddress;             // _addresses[3]\n        address relayerToken;               // _addresses[4]\n        uint256 quantity;                   // _values[0]\n        uint256 makerTokenAmount;           // _values[1]\n        uint256 expiration;                 // _values[2]\n        uint256 relayerTokenAmount;         // _values[3]\n        uint256 salt;                       // _values[4]\n        address[] requiredComponents;       // _requiredComponents\n        uint[] requiredComponentAmounts;    // _requiredComponentAmounts\n        bytes32 orderHash;\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Create hash of order parameters\n     *\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n     * @param  _values                      [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n     * @param  _requiredComponents          Components to be acquired by exchange order\n     * @param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order\n     */\n    function generateOrderHash(\n        address[5] _addresses,\n        uint[5] _values,\n        address[] _requiredComponents,\n        uint[] _requiredComponentAmounts\n    )\n        internal\n        pure\n        returns(bytes32)\n    {\n        // Hash the order parameters\n        return keccak256(\n            abi.encodePacked(\n                _addresses[0],              // setAddress\n                _addresses[1],              // makerAddress\n                _addresses[2],              // makerToken\n                _addresses[3],              // relayerAddress\n                _addresses[4],              // relayerToken\n                _values[0],                 // quantity\n                _values[1],                 // makerTokenAmount\n                _values[2],                 // expiration\n                _values[3],                 // relayerTokenAmount\n                _values[4],                 // salt\n                _requiredComponents,        // _requiredComponents\n                _requiredComponentAmounts   // _requiredComponentAmounts\n            )\n        );\n    }\n\n    /**\n     * Validate order signature\n     *\n     * @param  _orderHash       Hash of issuance order\n     * @param  _signerAddress   Address of Issuance Order signer\n     * @param  _v               v element of ECDSA signature\n     * @param  _r               r element of ECDSA signature\n     * @param  _s               s element of ECDSA signature\n     */\n    function validateSignature(\n        bytes32 _orderHash,\n        address _signerAddress,\n        uint8 _v,\n        bytes32 _r,\n        bytes32 _s\n    )\n        external\n        pure\n        returns(bool)\n    {\n        // Public address returned by ecrecover function\n        address recAddress;\n\n        // Ethereum msg prefix\n        bytes memory msgPrefix = \"\\x19Ethereum Signed Message:\\n32\";\n\n        // Find what address signed the order\n        recAddress = ecrecover(\n            keccak256(abi.encodePacked(msgPrefix, _orderHash)),\n            _v,\n            _r,\n            _s\n        );\n\n        return recAddress == _signerAddress;\n    }\n\n    /**\n     * Checks for rounding errors and returns value of potential partial amounts of a principal\n     *\n     * @param  _principal       Number fractional amount is derived from\n     * @param  _numerator       Numerator of fraction\n     * @param  _denominator     Denominator of fraction\n     * @return uint256          Fractional amount of principal calculated\n     */\n    function getPartialAmount(\n        uint _principal,\n        uint _numerator,\n        uint _denominator\n    )\n        external\n        returns (uint256)\n    {\n        // Get remainder of partial amount (if 0 not a partial amount)\n        uint remainder = mulmod(_principal, _numerator, _denominator);\n\n        // Return if not a partial amount\n        if (remainder == 0) {\n            return _principal.mul(_numerator).div(_denominator);\n        }\n\n        // Calculate error percentage\n        uint errPercentageTimes1000000 = remainder.mul(1000000).div(_numerator.mul(_principal));\n\n        // Require error percentage is less than 0.1%\n        require(errPercentageTimes1000000 < 1000, ROUNDING_ERROR_TOO_LARGE);\n        return _principal.mul(_numerator).div(_denominator);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        2323
      ]
    },
    "id": 2324,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2124,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2126,
        "nodeType": "ImportDirective",
        "scope": 2324,
        "sourceUnit": 2638,
        "src": "622:73:16",
        "symbolAliases": [
          {
            "foreign": 2125,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n ",
        "fullyImplemented": true,
        "id": 2323,
        "linearizedBaseContracts": [
          2323
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2129,
            "libraryName": {
              "contractScope": null,
              "id": 2127,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2637,
              "src": "889:8:16",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$2637",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "883:27:16",
            "typeName": {
              "id": 2128,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "902:7:16",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 2132,
            "name": "ROUNDING_ERROR_TOO_LARGE",
            "nodeType": "VariableDeclaration",
            "scope": 2323,
            "src": "967:70:16",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2130,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "967:6:16",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "526f756e64696e67206572726f7220746f6f206c617267652e",
              "id": 2131,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1010:27:16",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_98f79766e24467a66ce35650b47a79440de77a1969050bd915dbf14c3a8546f3",
                "typeString": "literal_string \"Rounding error too large.\""
              },
              "value": "Rounding error too large."
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 2161,
            "members": [
              {
                "constant": false,
                "id": 2134,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2391:18:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2133,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2391:7:16",
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
                "id": 2136,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2452:20:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2135,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2452:7:16",
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
                "id": 2138,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2513:18:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2137,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2513:7:16",
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
                "id": 2140,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2574:22:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2139,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2574:7:16",
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
                "id": 2142,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2635:20:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2141,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2635:7:16",
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
                "id": 2144,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2696:16:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2143,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2696:7:16",
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
                "id": 2146,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2754:24:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2145,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2754:7:16",
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
                "id": 2148,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2812:18:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2147,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2812:7:16",
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
                "id": 2150,
                "name": "relayerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2870:26:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2149,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2870:7:16",
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
                "id": 2152,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2928:12:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2151,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2928:7:16",
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
                "id": 2155,
                "name": "requiredComponents",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2986:28:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2153,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2986:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2154,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "2986:9:16",
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
                "id": 2158,
                "name": "requiredComponentAmounts",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "3053:31:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                  "typeString": "uint256[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2156,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3053:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2157,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3053:6:16",
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
                "id": 2160,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "3126:17:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 2159,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3126:7:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "IssuanceOrder",
            "nodeType": "StructDefinition",
            "scope": 2323,
            "src": "2360:790:16",
            "visibility": "public"
          },
          {
            "body": {
              "id": 2218,
              "nodeType": "Block",
              "src": "3918:859:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2183,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4029:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2185,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2184,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4040:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4029:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2186,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4087:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2188,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2187,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4098:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4087:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2189,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4147:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2191,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 2190,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4158:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4147:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2192,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4205:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2194,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 2193,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4216:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4205:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2195,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4267:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2197,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 2196,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4278:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4267:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2198,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4327:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2200,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2199,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4335:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4327:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2201,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4383:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2203,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2202,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4391:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4383:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2204,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4447:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2206,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 2205,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4455:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4447:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2207,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4505:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2209,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 2208,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4513:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4505:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2210,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4571:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2212,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 2211,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4579:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4571:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2213,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2172,
                            "src": "4623:19:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2214,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2175,
                            "src": "4690:25:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
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
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2181,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2725,
                            "src": "3995:3:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 2182,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3995:16:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 2215,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3995:765:16",
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
                      "id": 2180,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2732,
                      "src": "3972:9:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 2216,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3972:798:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 2179,
                  "id": 2217,
                  "nodeType": "Return",
                  "src": "3965:805:16"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                      [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents          Components to be acquired by exchange order\n@param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order",
            "id": 2219,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2176,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2165,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3725:21:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2162,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3725:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2164,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2163,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3733:1:16",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3725:10:16",
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
                  "id": 2169,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3756:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2166,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3756:4:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2168,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2167,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3761:1:16",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3756:7:16",
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
                  "id": 2172,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3781:29:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2170,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3781:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2171,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3781:9:16",
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
                  "id": 2175,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3820:32:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2173,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3820:4:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2174,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3820:6:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3715:143:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2179,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2178,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3905:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2177,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3905:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3904:9:16"
            },
            "scope": 2323,
            "src": "3689:1088:16",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2260,
              "nodeType": "Block",
              "src": "5348:440:16",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2235,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 2261,
                      "src": "5415:18:16",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 2234,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5415:7:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2236,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5415:18:16"
                },
                {
                  "assignments": [
                    2238
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2238,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 2261,
                      "src": "5475:22:16",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 2237,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5475:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2240,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 2239,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5500:34:16",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5475:59:16"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2254,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 2241,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2235,
                      "src": "5591:10:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 2246,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2238,
                                  "src": "5654:9:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 2247,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2221,
                                  "src": "5665:10:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
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
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 2244,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2725,
                                  "src": "5637:3:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 2245,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "5637:16:16",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 2248,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "5637:39:16",
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
                            "id": 2243,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2732,
                            "src": "5627:9:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 2249,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5627:50:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 2250,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2225,
                          "src": "5691:2:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 2251,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2227,
                          "src": "5707:2:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 2252,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2229,
                          "src": "5723:2:16",
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
                        "id": 2242,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2730,
                        "src": "5604:9:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 2253,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5604:131:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5591:144:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2255,
                  "nodeType": "ExpressionStatement",
                  "src": "5591:144:16"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 2258,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2256,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2235,
                      "src": "5753:10:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 2257,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2223,
                      "src": "5767:14:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5753:28:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2233,
                  "id": 2259,
                  "nodeType": "Return",
                  "src": "5746:35:16"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 2261,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2230,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2221,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5177:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2220,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5177:7:16",
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
                  "id": 2223,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5205:22:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2222,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5205:7:16",
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
                  "id": 2225,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5237:8:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2224,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "5237:5:16",
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
                  "id": 2227,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5255:10:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2226,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5255:7:16",
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
                  "id": 2229,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5275:10:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2228,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5275:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5167:124:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2232,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5338:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2231,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5338:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5337:6:16"
            },
            "scope": 2323,
            "src": "5141:647:16",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2321,
              "nodeType": "Block",
              "src": "6326:626:16",
              "statements": [
                {
                  "assignments": [
                    2273
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2273,
                      "name": "remainder",
                      "nodeType": "VariableDeclaration",
                      "scope": 2322,
                      "src": "6407:14:16",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2272,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6407:4:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2279,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2275,
                        "name": "_principal",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2263,
                        "src": "6431:10:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2276,
                        "name": "_numerator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2265,
                        "src": "6443:10:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2277,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2267,
                        "src": "6455:12:16",
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
                      "id": 2274,
                      "name": "mulmod",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2739,
                      "src": "6424:6:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_mulmod_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2278,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6424:44:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6407:61:16"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2282,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2280,
                      "name": "remainder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2273,
                      "src": "6525:9:16",
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
                      "id": 2281,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6538:1:16",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "6525:14:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 2292,
                  "nodeType": "IfStatement",
                  "src": "6521:96:16",
                  "trueBody": {
                    "id": 2291,
                    "nodeType": "Block",
                    "src": "6541:76:16",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2288,
                              "name": "_denominator",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2267,
                              "src": "6593:12:16",
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
                                  "id": 2285,
                                  "name": "_numerator",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2265,
                                  "src": "6577:10:16",
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
                                  "id": 2283,
                                  "name": "_principal",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2263,
                                  "src": "6562:10:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2284,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2578,
                                "src": "6562:14:16",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2286,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6562:26:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2287,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2592,
                            "src": "6562:30:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2289,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6562:44:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "functionReturnParameters": 2271,
                        "id": 2290,
                        "nodeType": "Return",
                        "src": "6555:51:16"
                      }
                    ]
                  }
                },
                {
                  "assignments": [
                    2294
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2294,
                      "name": "errPercentageTimes1000000",
                      "nodeType": "VariableDeclaration",
                      "scope": 2322,
                      "src": "6665:30:16",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2293,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6665:4:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2305,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 2302,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2263,
                            "src": "6740:10:16",
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
                            "id": 2300,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2265,
                            "src": "6725:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2301,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "6725:14:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2303,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6725:26:16",
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
                            "hexValue": "31303030303030",
                            "id": 2297,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "6712:7:16",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            },
                            "value": "1000000"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2295,
                            "name": "remainder",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2273,
                            "src": "6698:9:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2296,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "6698:13:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2298,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6698:22:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2299,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2592,
                      "src": "6698:26:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2304,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6698:54:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6665:87:16"
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
                        "id": 2309,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2307,
                          "name": "errPercentageTimes1000000",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2294,
                          "src": "6825:25:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31303030",
                          "id": 2308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6853:4:16",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000_by_1",
                            "typeString": "int_const 1000"
                          },
                          "value": "1000"
                        },
                        "src": "6825:32:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2310,
                        "name": "ROUNDING_ERROR_TOO_LARGE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2132,
                        "src": "6859:24:16",
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
                      "id": 2306,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2742,
                      "src": "6817:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2311,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6817:67:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2312,
                  "nodeType": "ExpressionStatement",
                  "src": "6817:67:16"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2318,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2267,
                        "src": "6932:12:16",
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
                            "id": 2315,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2265,
                            "src": "6916:10:16",
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
                            "id": 2313,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2263,
                            "src": "6901:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2314,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "6901:14:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2316,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6901:26:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2317,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2592,
                      "src": "6901:30:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2319,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6901:44:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2271,
                  "id": 2320,
                  "nodeType": "Return",
                  "src": "6894:51:16"
                }
              ]
            },
            "documentation": "Checks for rounding errors and returns value of potential partial amounts of a principal\n     * @param  _principal       Number fractional amount is derived from\n@param  _numerator       Numerator of fraction\n@param  _denominator     Denominator of fraction\n@return uint256          Fractional amount of principal calculated",
            "id": 2322,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getPartialAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2268,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2263,
                  "name": "_principal",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6205:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2262,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6205:4:16",
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
                  "id": 2265,
                  "name": "_numerator",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6230:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2264,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6230:4:16",
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
                  "id": 2267,
                  "name": "_denominator",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6255:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2266,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6255:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6195:83:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2271,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2270,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6313:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2269,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6313:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6312:9:16"
            },
            "scope": 2323,
            "src": "6170:782:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2324,
        "src": "856:6098:16"
      }
    ],
    "src": "597:6358:16"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/OrderLibrary.sol",
    "exportedSymbols": {
      "OrderLibrary": [
        2323
      ]
    },
    "id": 2324,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 2124,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:16"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 2126,
        "nodeType": "ImportDirective",
        "scope": 2324,
        "sourceUnit": 2638,
        "src": "622:73:16",
        "symbolAliases": [
          {
            "foreign": 2125,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "library",
        "documentation": "@title OrderLibrary\n@author Set Protocol\n * The Order Library contains functions for checking validation and hashing of Issuance Orders.\n ",
        "fullyImplemented": true,
        "id": 2323,
        "linearizedBaseContracts": [
          2323
        ],
        "name": "OrderLibrary",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 2129,
            "libraryName": {
              "contractScope": null,
              "id": 2127,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2637,
              "src": "889:8:16",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$2637",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "883:27:16",
            "typeName": {
              "id": 2128,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "902:7:16",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 2132,
            "name": "ROUNDING_ERROR_TOO_LARGE",
            "nodeType": "VariableDeclaration",
            "scope": 2323,
            "src": "967:70:16",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 2130,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "967:6:16",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "526f756e64696e67206572726f7220746f6f206c617267652e",
              "id": 2131,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1010:27:16",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_98f79766e24467a66ce35650b47a79440de77a1969050bd915dbf14c3a8546f3",
                "typeString": "literal_string \"Rounding error too large.\""
              },
              "value": "Rounding error too large."
            },
            "visibility": "internal"
          },
          {
            "canonicalName": "OrderLibrary.IssuanceOrder",
            "id": 2161,
            "members": [
              {
                "constant": false,
                "id": 2134,
                "name": "setAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2391:18:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2133,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2391:7:16",
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
                "id": 2136,
                "name": "makerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2452:20:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2135,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2452:7:16",
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
                "id": 2138,
                "name": "makerToken",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2513:18:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2137,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2513:7:16",
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
                "id": 2140,
                "name": "relayerAddress",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2574:22:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2139,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2574:7:16",
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
                "id": 2142,
                "name": "relayerToken",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2635:20:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                },
                "typeName": {
                  "id": 2141,
                  "name": "address",
                  "nodeType": "ElementaryTypeName",
                  "src": "2635:7:16",
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
                "id": 2144,
                "name": "quantity",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2696:16:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2143,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2696:7:16",
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
                "id": 2146,
                "name": "makerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2754:24:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2145,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2754:7:16",
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
                "id": 2148,
                "name": "expiration",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2812:18:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2147,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2812:7:16",
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
                "id": 2150,
                "name": "relayerTokenAmount",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2870:26:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2149,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2870:7:16",
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
                "id": 2152,
                "name": "salt",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2928:12:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2151,
                  "name": "uint256",
                  "nodeType": "ElementaryTypeName",
                  "src": "2928:7:16",
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
                "id": 2155,
                "name": "requiredComponents",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "2986:28:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                  "typeString": "address[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2153,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2986:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2154,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "2986:9:16",
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
                "id": 2158,
                "name": "requiredComponentAmounts",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "3053:31:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                  "typeString": "uint256[]"
                },
                "typeName": {
                  "baseType": {
                    "id": 2156,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "3053:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 2157,
                  "length": null,
                  "nodeType": "ArrayTypeName",
                  "src": "3053:6:16",
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
                "id": 2160,
                "name": "orderHash",
                "nodeType": "VariableDeclaration",
                "scope": 2161,
                "src": "3126:17:16",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_bytes32",
                  "typeString": "bytes32"
                },
                "typeName": {
                  "id": 2159,
                  "name": "bytes32",
                  "nodeType": "ElementaryTypeName",
                  "src": "3126:7:16",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "IssuanceOrder",
            "nodeType": "StructDefinition",
            "scope": 2323,
            "src": "2360:790:16",
            "visibility": "public"
          },
          {
            "body": {
              "id": 2218,
              "nodeType": "Block",
              "src": "3918:859:16",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2183,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4029:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2185,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2184,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4040:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4029:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2186,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4087:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2188,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2187,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4098:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4087:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2189,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4147:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2191,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 2190,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4158:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4147:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2192,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4205:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2194,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 2193,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4216:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4205:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2195,
                              "name": "_addresses",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2165,
                              "src": "4267:10:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                                "typeString": "address[5] memory"
                              }
                            },
                            "id": 2197,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 2196,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4278:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4267:13:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2198,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4327:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2200,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 2199,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4335:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4327:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2201,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4383:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2203,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "31",
                              "id": 2202,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4391:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_1_by_1",
                                "typeString": "int_const 1"
                              },
                              "value": "1"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4383:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2204,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4447:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2206,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "32",
                              "id": 2205,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4455:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_2_by_1",
                                "typeString": "int_const 2"
                              },
                              "value": "2"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4447:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2207,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4505:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2209,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "33",
                              "id": 2208,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4513:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_3_by_1",
                                "typeString": "int_const 3"
                              },
                              "value": "3"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4505:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 2210,
                              "name": "_values",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2169,
                              "src": "4571:7:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                                "typeString": "uint256[5] memory"
                              }
                            },
                            "id": 2212,
                            "indexExpression": {
                              "argumentTypes": null,
                              "hexValue": "34",
                              "id": 2211,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "4579:1:16",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_4_by_1",
                                "typeString": "int_const 4"
                              },
                              "value": "4"
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "4571:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2213,
                            "name": "_requiredComponents",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2172,
                            "src": "4623:19:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 2214,
                            "name": "_requiredComponentAmounts",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2175,
                            "src": "4690:25:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
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
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            },
                            {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            },
                            {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2181,
                            "name": "abi",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2725,
                            "src": "3995:3:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_abi",
                              "typeString": "abi"
                            }
                          },
                          "id": 2182,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "memberName": "encodePacked",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3995:16:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                            "typeString": "function () pure returns (bytes memory)"
                          }
                        },
                        "id": 2215,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "3995:765:16",
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
                      "id": 2180,
                      "name": "keccak256",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2732,
                      "src": "3972:9:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                        "typeString": "function () pure returns (bytes32)"
                      }
                    },
                    "id": 2216,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3972:798:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "functionReturnParameters": 2179,
                  "id": 2217,
                  "nodeType": "Return",
                  "src": "3965:805:16"
                }
              ]
            },
            "documentation": "Create hash of order parameters\n     * @param  _addresses                   [setAddress, makerAddress, makerToken, relayerAddress, relayerToken]\n@param  _values                      [quantity, makerTokenAmount, expiration, relayerTokenAmount, salt]\n@param  _requiredComponents          Components to be acquired by exchange order\n@param  _requiredComponentAmounts    Amounts of each component to be acquired by exchange order",
            "id": 2219,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "generateOrderHash",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2176,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2165,
                  "name": "_addresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3725:21:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$5_memory_ptr",
                    "typeString": "address[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2162,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3725:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2164,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2163,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3733:1:16",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3725:10:16",
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
                  "id": 2169,
                  "name": "_values",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3756:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$5_memory_ptr",
                    "typeString": "uint256[5]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2166,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3756:4:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2168,
                    "length": {
                      "argumentTypes": null,
                      "hexValue": "35",
                      "id": 2167,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3761:1:16",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": null,
                        "typeString": null
                      },
                      "value": "5"
                    },
                    "nodeType": "ArrayTypeName",
                    "src": "3756:7:16",
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
                  "id": 2172,
                  "name": "_requiredComponents",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3781:29:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2170,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3781:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 2171,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3781:9:16",
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
                  "id": 2175,
                  "name": "_requiredComponentAmounts",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3820:32:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 2173,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3820:4:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 2174,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3820:6:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3715:143:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2179,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2178,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2219,
                  "src": "3905:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2177,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3905:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3904:9:16"
            },
            "scope": 2323,
            "src": "3689:1088:16",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 2260,
              "nodeType": "Block",
              "src": "5348:440:16",
              "statements": [
                {
                  "assignments": [],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2235,
                      "name": "recAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 2261,
                      "src": "5415:18:16",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 2234,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "5415:7:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2236,
                  "initialValue": null,
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5415:18:16"
                },
                {
                  "assignments": [
                    2238
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2238,
                      "name": "msgPrefix",
                      "nodeType": "VariableDeclaration",
                      "scope": 2261,
                      "src": "5475:22:16",
                      "stateVariable": false,
                      "storageLocation": "memory",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bytes_memory_ptr",
                        "typeString": "bytes"
                      },
                      "typeName": {
                        "id": 2237,
                        "name": "bytes",
                        "nodeType": "ElementaryTypeName",
                        "src": "5475:5:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes_storage_ptr",
                          "typeString": "bytes"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2240,
                  "initialValue": {
                    "argumentTypes": null,
                    "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
                    "id": 2239,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "string",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "5500:34:16",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
                      "typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
                    },
                    "value": "\u0019Ethereum Signed Message:\n32"
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5475:59:16"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 2254,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 2241,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2235,
                      "src": "5591:10:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "arguments": [
                                {
                                  "argumentTypes": null,
                                  "id": 2246,
                                  "name": "msgPrefix",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2238,
                                  "src": "5654:9:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_memory_ptr",
                                    "typeString": "bytes memory"
                                  }
                                },
                                {
                                  "argumentTypes": null,
                                  "id": 2247,
                                  "name": "_orderHash",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2221,
                                  "src": "5665:10:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
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
                                    "typeIdentifier": "t_bytes32",
                                    "typeString": "bytes32"
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": null,
                                  "id": 2244,
                                  "name": "abi",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2725,
                                  "src": "5637:3:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_magic_abi",
                                    "typeString": "abi"
                                  }
                                },
                                "id": 2245,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": true,
                                "lValueRequested": false,
                                "memberName": "encodePacked",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": null,
                                "src": "5637:16:16",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                  "typeString": "function () pure returns (bytes memory)"
                                }
                              },
                              "id": 2248,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "5637:39:16",
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
                            "id": 2243,
                            "name": "keccak256",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2732,
                            "src": "5627:9:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_sha3_pure$__$returns$_t_bytes32_$",
                              "typeString": "function () pure returns (bytes32)"
                            }
                          },
                          "id": 2249,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "5627:50:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 2250,
                          "name": "_v",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2225,
                          "src": "5691:2:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint8",
                            "typeString": "uint8"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 2251,
                          "name": "_r",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2227,
                          "src": "5707:2:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 2252,
                          "name": "_s",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2229,
                          "src": "5723:2:16",
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
                        "id": 2242,
                        "name": "ecrecover",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2730,
                        "src": "5604:9:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
                          "typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
                        }
                      },
                      "id": 2253,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5604:131:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5591:144:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 2255,
                  "nodeType": "ExpressionStatement",
                  "src": "5591:144:16"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "id": 2258,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2256,
                      "name": "recAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2235,
                      "src": "5753:10:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "==",
                    "rightExpression": {
                      "argumentTypes": null,
                      "id": 2257,
                      "name": "_signerAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2223,
                      "src": "5767:14:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5753:28:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 2233,
                  "id": 2259,
                  "nodeType": "Return",
                  "src": "5746:35:16"
                }
              ]
            },
            "documentation": "Validate order signature\n     * @param  _orderHash       Hash of issuance order\n@param  _signerAddress   Address of Issuance Order signer\n@param  _v               v element of ECDSA signature\n@param  _r               r element of ECDSA signature\n@param  _s               s element of ECDSA signature",
            "id": 2261,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "validateSignature",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2230,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2221,
                  "name": "_orderHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5177:18:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2220,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5177:7:16",
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
                  "id": 2223,
                  "name": "_signerAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5205:22:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 2222,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5205:7:16",
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
                  "id": 2225,
                  "name": "_v",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5237:8:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint8",
                    "typeString": "uint8"
                  },
                  "typeName": {
                    "id": 2224,
                    "name": "uint8",
                    "nodeType": "ElementaryTypeName",
                    "src": "5237:5:16",
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
                  "id": 2227,
                  "name": "_r",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5255:10:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2226,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5255:7:16",
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
                  "id": 2229,
                  "name": "_s",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5275:10:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 2228,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "5275:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5167:124:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2232,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2261,
                  "src": "5338:4:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 2231,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "5338:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5337:6:16"
            },
            "scope": 2323,
            "src": "5141:647:16",
            "stateMutability": "pure",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2321,
              "nodeType": "Block",
              "src": "6326:626:16",
              "statements": [
                {
                  "assignments": [
                    2273
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2273,
                      "name": "remainder",
                      "nodeType": "VariableDeclaration",
                      "scope": 2322,
                      "src": "6407:14:16",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2272,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6407:4:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2279,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2275,
                        "name": "_principal",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2263,
                        "src": "6431:10:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2276,
                        "name": "_numerator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2265,
                        "src": "6443:10:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2277,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2267,
                        "src": "6455:12:16",
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
                      "id": 2274,
                      "name": "mulmod",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2739,
                      "src": "6424:6:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_mulmod_pure$_t_uint256_$_t_uint256_$_t_uint256_$returns$_t_uint256_$",
                        "typeString": "function (uint256,uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2278,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6424:44:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6407:61:16"
                },
                {
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 2282,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 2280,
                      "name": "remainder",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2273,
                      "src": "6525:9:16",
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
                      "id": 2281,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6538:1:16",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "src": "6525:14:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "falseBody": null,
                  "id": 2292,
                  "nodeType": "IfStatement",
                  "src": "6521:96:16",
                  "trueBody": {
                    "id": 2291,
                    "nodeType": "Block",
                    "src": "6541:76:16",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 2288,
                              "name": "_denominator",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2267,
                              "src": "6593:12:16",
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
                                  "id": 2285,
                                  "name": "_numerator",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2265,
                                  "src": "6577:10:16",
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
                                  "id": 2283,
                                  "name": "_principal",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 2263,
                                  "src": "6562:10:16",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "id": 2284,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "memberName": "mul",
                                "nodeType": "MemberAccess",
                                "referencedDeclaration": 2578,
                                "src": "6562:14:16",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                                  "typeString": "function (uint256,uint256) pure returns (uint256)"
                                }
                              },
                              "id": 2286,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "kind": "functionCall",
                              "lValueRequested": false,
                              "names": [],
                              "nodeType": "FunctionCall",
                              "src": "6562:26:16",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 2287,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "div",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2592,
                            "src": "6562:30:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 2289,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6562:44:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "functionReturnParameters": 2271,
                        "id": 2290,
                        "nodeType": "Return",
                        "src": "6555:51:16"
                      }
                    ]
                  }
                },
                {
                  "assignments": [
                    2294
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 2294,
                      "name": "errPercentageTimes1000000",
                      "nodeType": "VariableDeclaration",
                      "scope": 2322,
                      "src": "6665:30:16",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 2293,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "6665:4:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 2305,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 2302,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2263,
                            "src": "6740:10:16",
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
                            "id": 2300,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2265,
                            "src": "6725:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2301,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "6725:14:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2303,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6725:26:16",
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
                            "hexValue": "31303030303030",
                            "id": 2297,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "6712:7:16",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            },
                            "value": "1000000"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1000000_by_1",
                              "typeString": "int_const 1000000"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "id": 2295,
                            "name": "remainder",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2273,
                            "src": "6698:9:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2296,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "6698:13:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2298,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6698:22:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2299,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2592,
                      "src": "6698:26:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2304,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6698:54:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "6665:87:16"
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
                        "id": 2309,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 2307,
                          "name": "errPercentageTimes1000000",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2294,
                          "src": "6825:25:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31303030",
                          "id": 2308,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6853:4:16",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000_by_1",
                            "typeString": "int_const 1000"
                          },
                          "value": "1000"
                        },
                        "src": "6825:32:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 2310,
                        "name": "ROUNDING_ERROR_TOO_LARGE",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2132,
                        "src": "6859:24:16",
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
                      "id": 2306,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2742,
                      "src": "6817:7:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 2311,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6817:67:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 2312,
                  "nodeType": "ExpressionStatement",
                  "src": "6817:67:16"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 2318,
                        "name": "_denominator",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2267,
                        "src": "6932:12:16",
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
                            "id": 2315,
                            "name": "_numerator",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2265,
                            "src": "6916:10:16",
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
                            "id": 2313,
                            "name": "_principal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2263,
                            "src": "6901:10:16",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 2314,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "mul",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2578,
                          "src": "6901:14:16",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 2316,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "6901:26:16",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "id": 2317,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "div",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2592,
                      "src": "6901:30:16",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                        "typeString": "function (uint256,uint256) pure returns (uint256)"
                      }
                    },
                    "id": 2319,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6901:44:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 2271,
                  "id": 2320,
                  "nodeType": "Return",
                  "src": "6894:51:16"
                }
              ]
            },
            "documentation": "Checks for rounding errors and returns value of potential partial amounts of a principal\n     * @param  _principal       Number fractional amount is derived from\n@param  _numerator       Numerator of fraction\n@param  _denominator     Denominator of fraction\n@return uint256          Fractional amount of principal calculated",
            "id": 2322,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "getPartialAmount",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 2268,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2263,
                  "name": "_principal",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6205:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2262,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6205:4:16",
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
                  "id": 2265,
                  "name": "_numerator",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6230:15:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2264,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6230:4:16",
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
                  "id": 2267,
                  "name": "_denominator",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6255:17:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2266,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "6255:4:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6195:83:16"
            },
            "payable": false,
            "returnParameters": {
              "id": 2271,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 2270,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 2322,
                  "src": "6313:7:16",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 2269,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "6313:7:16",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6312:9:16"
            },
            "scope": 2323,
            "src": "6170:782:16",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2324,
        "src": "856:6098:16"
      }
    ],
    "src": "597:6358:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.463Z"
}
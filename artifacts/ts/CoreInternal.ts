export const CoreInternal = 
{
  "contractName": "CoreInternal",
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
          "name": "_vaultAddress",
          "type": "address"
        }
      ],
      "name": "setVaultAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_transferProxyAddress",
          "type": "address"
        }
      ],
      "name": "setTransferProxyAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factoryAddress",
          "type": "address"
        }
      ],
      "name": "enableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factoryAddress",
          "type": "address"
        }
      ],
      "name": "disableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_setAddress",
          "type": "address"
        }
      ],
      "name": "disableSet",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a0319163317905561084c806100256000396000f3006080604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100ea578063124cfd781461011f5780631a1f2b3e146101425780631e912bd614610163578063430bf08a1461018d578063715018a6146101be57806377274ff0146101d357806385535cc5146101f45780638ca4daf9146102155780638da5cb5b1461022a5780639f80ee881461023f578063a003e06914610260578063c19d93fb1461027b578063f2fde38b146102b6578063f7213db6146102d7578063fef3ee73146102ef575b600080fd5b3480156100f657600080fd5b5061010b600160a060020a0360043516610310565b604080519115158252519081900360200190f35b34801561012b57600080fd5b50610140600160a060020a036004351661032e565b005b34801561014e57600080fd5b50610140600160a060020a0360043516610374565b34801561016f57600080fd5b5061017b6004356104d0565b60408051918252519081900360200190f35b34801561019957600080fd5b506101a26104e2565b60408051600160a060020a039092168252519081900360200190f35b3480156101ca57600080fd5b506101406104f1565b3480156101df57600080fd5b50610140600160a060020a036004351661055d565b34801561020057600080fd5b50610140600160a060020a036004351661067d565b34801561022157600080fd5b506101a26106c3565b34801561023657600080fd5b506101a26106d2565b34801561024b57600080fd5b50610140600160a060020a03600435166106e1565b34801561026c57600080fd5b506101a260ff6004351661071c565b34801561028757600080fd5b5061029061073a565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102c257600080fd5b50610140600160a060020a0360043516610750565b3480156102e357600080fd5b5061017b600435610773565b3480156102fb57600080fd5b5061010b600160a060020a0360043516610785565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a0316331461034557600080fd5b6002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a0316331461038b57600080fd5b600160a060020a038116600090815260046020908152604091829020548251606081018452602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420928101929092527f65786973742e000000000000000000000000000000000000000000000000000092820192909252829160ff1615156104ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561047257818101518382015260200161045a565b50505050905090810190601f16801561049f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050600160a060020a03166000908152600460205260409020805460ff19169055565b60009081526007602052604090205490565b600354600160a060020a031690565b600054600160a060020a0316331461050857600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a0316331461057457600080fd5b600160a060020a038116600090815260056020908152604091829020548251606081018452602881527f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f928101929092527f742065786973742e00000000000000000000000000000000000000000000000092820192909252829160ff16151561065a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561047257818101518382015260200161045a565b5050600160a060020a03166000908152600560205260409020805460ff19169055565b600054600160a060020a0316331461069457600080fd5b6003805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600254600160a060020a031690565b600054600160a060020a031681565b600054600160a060020a031633146106f857600080fd5b600160a060020a03166000908152600460205260409020805460ff19166001179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a0316331461076757600080fd5b610770816107a3565b50565b60009081526006602052604090205490565b600160a060020a031660009081526005602052604090205460ff1690565b600160a060020a03811615156107b857600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820d38c1a4c7dc39f0d3432ca8aa3d435d172a17e6473e9a81020f21d0ea8467dd20029",
  "deployedBytecode": "0x6080604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100ea578063124cfd781461011f5780631a1f2b3e146101425780631e912bd614610163578063430bf08a1461018d578063715018a6146101be57806377274ff0146101d357806385535cc5146101f45780638ca4daf9146102155780638da5cb5b1461022a5780639f80ee881461023f578063a003e06914610260578063c19d93fb1461027b578063f2fde38b146102b6578063f7213db6146102d7578063fef3ee73146102ef575b600080fd5b3480156100f657600080fd5b5061010b600160a060020a0360043516610310565b604080519115158252519081900360200190f35b34801561012b57600080fd5b50610140600160a060020a036004351661032e565b005b34801561014e57600080fd5b50610140600160a060020a0360043516610374565b34801561016f57600080fd5b5061017b6004356104d0565b60408051918252519081900360200190f35b34801561019957600080fd5b506101a26104e2565b60408051600160a060020a039092168252519081900360200190f35b3480156101ca57600080fd5b506101406104f1565b3480156101df57600080fd5b50610140600160a060020a036004351661055d565b34801561020057600080fd5b50610140600160a060020a036004351661067d565b34801561022157600080fd5b506101a26106c3565b34801561023657600080fd5b506101a26106d2565b34801561024b57600080fd5b50610140600160a060020a03600435166106e1565b34801561026c57600080fd5b506101a260ff6004351661071c565b34801561028757600080fd5b5061029061073a565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102c257600080fd5b50610140600160a060020a0360043516610750565b3480156102e357600080fd5b5061017b600435610773565b3480156102fb57600080fd5b5061010b600160a060020a0360043516610785565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a0316331461034557600080fd5b6002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600054600160a060020a0316331461038b57600080fd5b600160a060020a038116600090815260046020908152604091829020548251606081018452602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420928101929092527f65786973742e000000000000000000000000000000000000000000000000000092820192909252829160ff1615156104ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561047257818101518382015260200161045a565b50505050905090810190601f16801561049f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050600160a060020a03166000908152600460205260409020805460ff19169055565b60009081526007602052604090205490565b600354600160a060020a031690565b600054600160a060020a0316331461050857600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a0316331461057457600080fd5b600160a060020a038116600090815260056020908152604091829020548251606081018452602881527f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f928101929092527f742065786973742e00000000000000000000000000000000000000000000000092820192909252829160ff16151561065a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561047257818101518382015260200161045a565b5050600160a060020a03166000908152600560205260409020805460ff19169055565b600054600160a060020a0316331461069457600080fd5b6003805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600254600160a060020a031690565b600054600160a060020a031681565b600054600160a060020a031633146106f857600080fd5b600160a060020a03166000908152600460205260409020805460ff19166001179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a0316331461076757600080fd5b610770816107a3565b50565b60009081526006602052604090205490565b600160a060020a031660009081526005602052604090205460ff1690565b600160a060020a03811615156107b857600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820d38c1a4c7dc39f0d3432ca8aa3d435d172a17e6473e9a81020f21d0ea8467dd20029",
  "sourceMap": "1002:1952:11:-;;;567:5:59;:18;;-1:-1:-1;;;;;;567:18:59;575:10;567:18;;;1002:1952:11;;;;;;",
  "deployedSourceMap": "1002:1952:11:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2083:150:22;-1:-1:-1;;;;;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;1655:256:11;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1655:256:11;-1:-1:-1;;;;;1655:256:11;;;;;;;2408:204;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2408:204:11;-1:-1:-1;;;;;2408:204:11;;;;;2529:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2529:150:22;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;-1:-1:-1;;;;;1954:123:22;;;;;;;;;;;;;;827:111:59;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:59;;;;2773:179:11;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2773:179:11;-1:-1:-1;;;;;2773:179:11;;;;;1271:216;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1271:216:11;-1:-1:-1;;;;;1271:216:11;;;;;1809:139:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;238:20:59;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:59;;;;2076:162:11;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2076:162:11;-1:-1:-1;;;;;2076:162:11;;;;;1656:147:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1656:147:22;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;1100:103:59;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:59;-1:-1:-1;;;;;1100:103:59;;;;;2377:146:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2377:146:22;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2239:132:22;-1:-1:-1;;;;;2239:132:22;;;;;2083:150;-1:-1:-1;;;;;2196:30:22;2169:4;2196:30;;;:20;:30;;;;;;;;;2083:150::o;1655:256:11:-;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;1854:26:11;:50;;-1:-1:-1;;1854:50:11;-1:-1:-1;;;;;1854:50:11;;;;;;;;;;1655:256::o;2408:204::-;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1709:37:21;;;;;;:20;:37;;;;;;;;;;1760:15;;;;;;;;;;;;;;;;;;;;;;;;;;2529::11;;1709:37:21;;1688:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1688:97:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;;;2560:37:11;2600:5;2560:37;;;:20;:37;;;;;:45;;-1:-1:-1;;2560:45:11;;;2408:204::o;2529:150:22:-;2615:4;2642:30;;;:18;:30;;;;;;;2529:150::o;1954:123::-;2052:18;;-1:-1:-1;;;;;2052:18:22;1954:123;:::o;827:111:59:-;719:5;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:59;;;;884:25;;;931:1;915:18;;-1:-1:-1;;915:18:59;;;827:111::o;2773:179:11:-;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1934:28:21;;;;;;:15;:28;;;;;;;;;;1976:11;;;;;;;;;;;;;;;;;;;;;;;;;;2882::11;;1934:28:21;;1913:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1913:84:21;-1:-1:-1;;;;;;;2909:28:11;2940:5;2909:28;;;:15;:28;;;;;:36;;-1:-1:-1;;2909:36:11;;;2773:179::o;1271:216::-;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;1446:18:11;:34;;-1:-1:-1;;1446:34:11;-1:-1:-1;;;;;1446:34:11;;;;;;;;;;1271:216::o;1809:139:22:-;1915:26;;-1:-1:-1;;;;;1915:26:22;1809:139;:::o;238:20:59:-;;;-1:-1:-1;;;;;238:20:59;;:::o;2076:162:11:-;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2187:37:11;;;;;:20;:37;;;;;:44;;-1:-1:-1;;2187:44:11;2227:4;2187:44;;;2076:162::o;1656:147:22:-;1768:28;;1738:7;1768:28;;;:5;:28;;;;;;-1:-1:-1;;;;;1768:28:22;;1656:147::o;1579:18::-;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;:::o;1100:103:59:-;719:5;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;2377:146:22:-;2461:4;2488:28;;;:16;:28;;;;;;;2377:146::o;2239:132::-;-1:-1:-1;;;;;2343:21:22;2316:4;2343:21;;;:15;:21;;;;;;;;;2239:132::o;1338:171:59:-;-1:-1:-1;;;;;1408:23:59;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:59;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;1487:17:59;-1:-1:-1;;;;;1487:17:59;;;;;;;;;;1338:171::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state that tracks contract\n * addresses that need to interact with Core.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState,\n    CoreModifiers\n{\n    /* ============ Setter Functions ============ */\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vaultAddress   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vaultAddress\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to vaultAddress state variable\n        state.vaultAddress = _vaultAddress;\n    }\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxyAddress   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxyAddress\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to transferProxyAddress state variable\n        state.transferProxyAddress = _transferProxyAddress;\n    }\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factoryAddress\n    )\n        external\n        onlyOwner\n    {\n        state.validFactories[_factoryAddress] = true;\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factoryAddress\n    )\n        external\n        onlyOwner\n        isValidFactory(_factoryAddress)\n    {\n        state.validFactories[_factoryAddress] = false;\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _setAddress   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _setAddress\n    )\n        external\n        onlyOwner\n        isValidSet(_setAddress)\n    {\n        state.validSets[_setAddress] = false;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1724
      ]
    },
    "id": 1725,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1629,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1631,
        "nodeType": "ImportDirective",
        "scope": 1725,
        "sourceUnit": 5890,
        "src": "622:76:11",
        "symbolAliases": [
          {
            "foreign": 1630,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1633,
        "nodeType": "ImportDirective",
        "scope": 1725,
        "sourceUnit": 2976,
        "src": "699:63:11",
        "symbolAliases": [
          {
            "foreign": 1632,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1635,
        "nodeType": "ImportDirective",
        "scope": 1725,
        "sourceUnit": 3089,
        "src": "763:49:11",
        "symbolAliases": [
          {
            "foreign": 1634,
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
              "id": 1636,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5889,
              "src": "1031:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$5889",
                "typeString": "contract Ownable"
              }
            },
            "id": 1637,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:7:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1638,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1044:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 1639,
            "nodeType": "InheritanceSpecifier",
            "src": "1044:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1640,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1059:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1641,
            "nodeType": "InheritanceSpecifier",
            "src": "1059:13:11"
          }
        ],
        "contractDependencies": [
          2975,
          3088,
          5889
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state that tracks contract\naddresses that need to interact with Core.",
        "fullyImplemented": true,
        "id": 1724,
        "linearizedBaseContracts": [
          1724,
          2975,
          3088,
          5889
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1654,
              "nodeType": "Block",
              "src": "1372:115:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1652,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1648,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "1446:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1650,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vaultAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2985,
                      "src": "1446:18:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1651,
                      "name": "_vaultAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1643,
                      "src": "1467:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1446:34:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1653,
                  "nodeType": "ExpressionStatement",
                  "src": "1446:34:11"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 1655,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1646,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1645,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "1358:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1358:9:11"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1644,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1643,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1655,
                  "src": "1305:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1642,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1305:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1295:37:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1647,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1372:0:11"
            },
            "scope": 1724,
            "src": "1271:216:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1668,
              "nodeType": "Block",
              "src": "1772:139:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1666,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1662,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "1854:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1664,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxyAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2983,
                      "src": "1854:26:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1665,
                      "name": "_transferProxyAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1657,
                      "src": "1883:21:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1854:50:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1667,
                  "nodeType": "ExpressionStatement",
                  "src": "1854:50:11"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 1669,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1660,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1659,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "1758:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1758:9:11"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1658,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1657,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1669,
                  "src": "1697:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1656,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1697:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1687:45:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1661,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1772:0:11"
            },
            "scope": 1724,
            "src": "1655:256:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1684,
              "nodeType": "Block",
              "src": "2177:61:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1682,
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
                          "id": 1676,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2187:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1679,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2989,
                        "src": "2187:20:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1680,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1678,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1671,
                        "src": "2208:15:11",
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
                      "src": "2187:37:11",
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
                      "id": 1681,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2227:4:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2187:44:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1683,
                  "nodeType": "ExpressionStatement",
                  "src": "2187:44:11"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 1685,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1674,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1673,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "2163:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2163:9:11"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1672,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1671,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1685,
                  "src": "2108:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1670,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2108:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2098:39:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1675,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2177:0:11"
            },
            "scope": 1724,
            "src": "2076:162:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1703,
              "nodeType": "Block",
              "src": "2550:62:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1701,
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
                          "id": 1695,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2560:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1698,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2989,
                        "src": "2560:20:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1699,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1697,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1687,
                        "src": "2581:15:11",
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
                      "src": "2560:37:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1700,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2600:5:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2560:45:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1702,
                  "nodeType": "ExpressionStatement",
                  "src": "2560:45:11"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 1704,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1690,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1689,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "2496:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2496:9:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1692,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1687,
                    "src": "2529:15:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1693,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1691,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2939,
                  "src": "2514:14:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2514:31:11"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1688,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1687,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1704,
                  "src": "2441:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1686,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2441:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2431:39:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1694,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2550:0:11"
            },
            "scope": 1724,
            "src": "2408:204:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1722,
              "nodeType": "Block",
              "src": "2899:53:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1720,
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
                          "id": 1714,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2909:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1717,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2993,
                        "src": "2909:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1718,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1716,
                        "name": "_setAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1706,
                        "src": "2925:11:11",
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
                      "src": "2909:28:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1719,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2940:5:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2909:36:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1721,
                  "nodeType": "ExpressionStatement",
                  "src": "2909:36:11"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 1723,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1709,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1708,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "2853:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2853:9:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1711,
                    "name": "_setAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1706,
                    "src": "2882:11:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1712,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1710,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2953,
                  "src": "2871:10:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2871:23:11"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1707,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1706,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1723,
                  "src": "2802:19:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1705,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2802:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2792:35:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1713,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2899:0:11"
            },
            "scope": 1724,
            "src": "2773:179:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1725,
        "src": "1002:1952:11"
      }
    ],
    "src": "597:2358:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1724
      ]
    },
    "id": 1725,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1629,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1631,
        "nodeType": "ImportDirective",
        "scope": 1725,
        "sourceUnit": 5890,
        "src": "622:76:11",
        "symbolAliases": [
          {
            "foreign": 1630,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1633,
        "nodeType": "ImportDirective",
        "scope": 1725,
        "sourceUnit": 2976,
        "src": "699:63:11",
        "symbolAliases": [
          {
            "foreign": 1632,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1635,
        "nodeType": "ImportDirective",
        "scope": 1725,
        "sourceUnit": 3089,
        "src": "763:49:11",
        "symbolAliases": [
          {
            "foreign": 1634,
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
              "id": 1636,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5889,
              "src": "1031:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$5889",
                "typeString": "contract Ownable"
              }
            },
            "id": 1637,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:7:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1638,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1044:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 1639,
            "nodeType": "InheritanceSpecifier",
            "src": "1044:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1640,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1059:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1641,
            "nodeType": "InheritanceSpecifier",
            "src": "1059:13:11"
          }
        ],
        "contractDependencies": [
          2975,
          3088,
          5889
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state that tracks contract\naddresses that need to interact with Core.",
        "fullyImplemented": true,
        "id": 1724,
        "linearizedBaseContracts": [
          1724,
          2975,
          3088,
          5889
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1654,
              "nodeType": "Block",
              "src": "1372:115:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1652,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1648,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "1446:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1650,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vaultAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2985,
                      "src": "1446:18:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1651,
                      "name": "_vaultAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1643,
                      "src": "1467:13:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1446:34:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1653,
                  "nodeType": "ExpressionStatement",
                  "src": "1446:34:11"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 1655,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1646,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1645,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "1358:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1358:9:11"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1644,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1643,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1655,
                  "src": "1305:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1642,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1305:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1295:37:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1647,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1372:0:11"
            },
            "scope": 1724,
            "src": "1271:216:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1668,
              "nodeType": "Block",
              "src": "1772:139:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1666,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1662,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3004,
                        "src": "1854:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3002_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1664,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxyAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2983,
                      "src": "1854:26:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1665,
                      "name": "_transferProxyAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1657,
                      "src": "1883:21:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1854:50:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1667,
                  "nodeType": "ExpressionStatement",
                  "src": "1854:50:11"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 1669,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1660,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1659,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "1758:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1758:9:11"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1658,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1657,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1669,
                  "src": "1697:29:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1656,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1697:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1687:45:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1661,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1772:0:11"
            },
            "scope": 1724,
            "src": "1655:256:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1684,
              "nodeType": "Block",
              "src": "2177:61:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1682,
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
                          "id": 1676,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2187:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1679,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2989,
                        "src": "2187:20:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1680,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1678,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1671,
                        "src": "2208:15:11",
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
                      "src": "2187:37:11",
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
                      "id": 1681,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2227:4:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2187:44:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1683,
                  "nodeType": "ExpressionStatement",
                  "src": "2187:44:11"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 1685,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1674,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1673,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "2163:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2163:9:11"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1672,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1671,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1685,
                  "src": "2108:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1670,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2108:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2098:39:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1675,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2177:0:11"
            },
            "scope": 1724,
            "src": "2076:162:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1703,
              "nodeType": "Block",
              "src": "2550:62:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1701,
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
                          "id": 1695,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2560:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1698,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2989,
                        "src": "2560:20:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1699,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1697,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1687,
                        "src": "2581:15:11",
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
                      "src": "2560:37:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1700,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2600:5:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2560:45:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1702,
                  "nodeType": "ExpressionStatement",
                  "src": "2560:45:11"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 1704,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1690,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1689,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "2496:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2496:9:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1692,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1687,
                    "src": "2529:15:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1693,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1691,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2939,
                  "src": "2514:14:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2514:31:11"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1688,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1687,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1704,
                  "src": "2441:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1686,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2441:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2431:39:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1694,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2550:0:11"
            },
            "scope": 1724,
            "src": "2408:204:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1722,
              "nodeType": "Block",
              "src": "2899:53:11",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1720,
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
                          "id": 1714,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "2909:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1717,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2993,
                        "src": "2909:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1718,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1716,
                        "name": "_setAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1706,
                        "src": "2925:11:11",
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
                      "src": "2909:28:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1719,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2940:5:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2909:36:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1721,
                  "nodeType": "ExpressionStatement",
                  "src": "2909:36:11"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 1723,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1709,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1708,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
                  "src": "2853:9:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2853:9:11"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1711,
                    "name": "_setAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1706,
                    "src": "2882:11:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1712,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1710,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2953,
                  "src": "2871:10:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2871:23:11"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1707,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1706,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1723,
                  "src": "2802:19:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1705,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2802:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2792:35:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1713,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2899:0:11"
            },
            "scope": 1724,
            "src": "2773:179:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1725,
        "src": "1002:1952:11"
      }
    ],
    "src": "597:2358:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.192Z"
}
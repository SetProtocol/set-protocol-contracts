export const LibConstants = 
{
  "contractName": "LibConstants",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "ZRX_ASSET_DATA",
      "outputs": [
        {
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506101a7806100206000396000f3006080604052600436106100405763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663db123b1a8114610045575b600080fd5b34801561005157600080fd5b5061005a6100cf565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561009457818101518382015260200161007c565b50505050905090810190601f1680156100c15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156101735780601f1061014857610100808354040283529160200191610173565b820191906000526020600020905b81548152906001019060200180831161015657829003601f168201915b5050505050815600a165627a7a72305820a525ab35b5f695c490625b9e91f57d958300ec97b0c7e71e2a780f1b7a6464610029",
  "deployedBytecode": "0x6080604052600436106100405763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663db123b1a8114610045575b600080fd5b34801561005157600080fd5b5061005a6100cf565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561009457818101518382015260200161007c565b50505050905090810190601f1680156100c15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156101735780601f1061014857610100808354040283529160200191610173565b820191906000526020600020905b81548152906001019060200180831161015657829003601f168201915b5050505050815600a165627a7a72305820a525ab35b5f695c490625b9e91f57d958300ec97b0c7e71e2a780f1b7a6464610029",
  "sourceMap": "606:229:39:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;606:229:39;;;;;;;",
  "deployedSourceMap": "606:229:39:-;;;;;;;;;;;;;;;;;;;;;;;805:27;;8:9:-1;5:2;;;30:1;27;20:12;5:2;805:27:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;805:27:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
  "source": "/*\n\n  Copyright 2018 ZeroEx Intl.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity ^0.4.24;\n\ncontract LibConstants {\n   \n    // Asset data for ZRX token. Used for fee transfers.\n    // @TODO: Hardcode constant when we deploy. Currently \n    //        not constant to make testing easier.\n    bytes public ZRX_ASSET_DATA;\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibConstants.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibConstants.sol",
    "exportedSymbols": {
      "LibConstants": [
        4151
      ]
    },
    "id": 4152,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4148,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:39"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4151,
        "linearizedBaseContracts": [
          4151
        ],
        "name": "LibConstants",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 4150,
            "name": "ZRX_ASSET_DATA",
            "nodeType": "VariableDeclaration",
            "scope": 4151,
            "src": "805:27:39",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes_storage",
              "typeString": "bytes"
            },
            "typeName": {
              "id": 4149,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "805:5:39",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            },
            "value": null,
            "visibility": "public"
          }
        ],
        "scope": 4152,
        "src": "606:229:39"
      }
    ],
    "src": "580:256:39"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/external/0x/Exchange/libs/LibConstants.sol",
    "exportedSymbols": {
      "LibConstants": [
        4151
      ]
    },
    "id": 4152,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4148,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "580:24:39"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 4151,
        "linearizedBaseContracts": [
          4151
        ],
        "name": "LibConstants",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 4150,
            "name": "ZRX_ASSET_DATA",
            "nodeType": "VariableDeclaration",
            "scope": 4151,
            "src": "805:27:39",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes_storage",
              "typeString": "bytes"
            },
            "typeName": {
              "id": 4149,
              "name": "bytes",
              "nodeType": "ElementaryTypeName",
              "src": "805:5:39",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes_storage_ptr",
                "typeString": "bytes"
              }
            },
            "value": null,
            "visibility": "public"
          }
        ],
        "scope": 4152,
        "src": "606:229:39"
      }
    ],
    "src": "580:256:39"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.418Z"
}
export const ITransferProxy = 
{
  "contractName": "ITransferProxy",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "transfer",
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
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n/**\n * @title ITransferProxy\n * @author Set Protocol\n *\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\n * TransferProxy contract from another contract.\n */\ninterface ITransferProxy {\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Can only be called by authorized core contracts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _quantity       The number of tokens to transfer\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     */\n    function transfer(\n        address _token,\n        uint _quantity,\n        address _from,\n        address _to\n    )\n        external;\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
    "exportedSymbols": {
      "ITransferProxy": [
        1915
      ]
    },
    "id": 1916,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1903,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:12"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ITransferProxy\n@author Set Protocol\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\nTransferProxy contract from another contract.",
        "fullyImplemented": false,
        "id": 1915,
        "linearizedBaseContracts": [
          1915
        ],
        "name": "ITransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _token          The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 1914,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1912,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1905,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1341:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1904,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1341:7:12",
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
                  "id": 1907,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1365:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1906,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1365:4:12",
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
                  "id": 1909,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1389:13:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1908,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1389:7:12",
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
                  "id": 1911,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1412:11:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1910,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1412:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1331:98:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1913,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1446:0:12"
            },
            "scope": 1915,
            "src": "1314:133:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1916,
        "src": "824:625:12"
      }
    ],
    "src": "597:853:12"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
    "exportedSymbols": {
      "ITransferProxy": [
        1915
      ]
    },
    "id": 1916,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1903,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:12"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "interface",
        "documentation": "@title ITransferProxy\n@author Set Protocol\n * The ITransferProxy interface provides a light-weight, structured way to interact with the\nTransferProxy contract from another contract.",
        "fullyImplemented": false,
        "id": 1915,
        "linearizedBaseContracts": [
          1915
        ],
        "name": "ITransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _token          The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 1914,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1912,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1905,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1341:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1904,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1341:7:12",
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
                  "id": 1907,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1365:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1906,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1365:4:12",
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
                  "id": 1909,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1389:13:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1908,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1389:7:12",
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
                  "id": 1911,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1914,
                  "src": "1412:11:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1910,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1412:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1331:98:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1913,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1446:0:12"
            },
            "scope": 1915,
            "src": "1314:133:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1916,
        "src": "824:625:12"
      }
    ],
    "src": "597:853:12"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.447Z"
}
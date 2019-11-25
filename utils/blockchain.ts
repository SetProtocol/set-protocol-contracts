import promisify from 'tiny-promisify';
import Web3 from 'web3';

import { BigNumber } from 'bignumber.js';

export class Blockchain {
  private _web3: Web3;
  private _snapshotId: number;

  constructor(web3: Web3) {
    this._web3 = web3;
  }

  public async saveSnapshotAsync(): Promise<void> {
    const response = await this.sendJSONRpcRequestAsync('evm_snapshot', []);
    this._snapshotId = parseInt(response.result, 16);
  }

  public async revertAsync(): Promise<void> {
    await this.sendJSONRpcRequestAsync('evm_revert', [this._snapshotId]);
  }

  public async increaseTimeAsync(
    duration: BigNumber,
  ): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_increaseTime', [duration.toNumber()]);
  }

  public async mineBlockAsync(): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_mine', []);
  }

  private async sendJSONRpcRequestAsync(
    method: string,
    params: any[],
  ): Promise<any> {
    return promisify(this._web3.currentProvider.send, {
      context: this._web3.currentProvider,
    })({
      jsonrpc: '2.0',
      method,
      params,
      id: new Date().getTime(),
    });
  }
}


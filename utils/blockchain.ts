import * as promisify from 'tiny-promisify';
import * as Web3 from 'web3';


export class Blockchain {
  private _web3: Web3;
  private _snapshotIds: number[];

  constructor(web3: Web3) {
    this._web3 = web3;
    this._snapshotIds = [];
  }

  public async saveSnapshotAsync(): Promise<void> {
    const response = await this.sendJSONRpcRequestAsync('evm_snapshot', []);
    this._snapshotIds.push(parseInt(response.result, 16));
  }

  public async revertAsync(): Promise<void> {
    const snapshotId = this._snapshotIds.pop() as number;
    await this.sendJSONRpcRequestAsync('evm_revert', [snapshotId]);
  }

  public async increaseTimeAsync(
    duration: number,
  ): Promise<any> {
    await this.sendJSONRpcRequestAsync('evm_increaseTime', [duration]);
  }

  private async sendJSONRpcRequestAsync(
    method: string,
    params: any[],
  ): Promise<any> {
    return promisify(this._web3.currentProvider.sendAsync, {
      context: this._web3.currentProvider,
    })({
      jsonrpc: '2.0',
      method,
      params,
      id: new Date().getTime(),
    });
  }
}

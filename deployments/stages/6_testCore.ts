import { DeploymentStageInterface } from '../../types/deployment_stage_interface';

import BigNumber from 'bignumber.js';

import { getNetworkConstant, getContractAddress, getPrivateKey, findDependency } from '../utils/output-helper';
import { TX_DEFAULTS, executeTransaction, executeRevertTransaction } from '../utils/blockchain';
import { DEPENDENCY } from '../deployedContractParameters';

import {
  CoreContract,
  ERC20DetailedContract,
  RebalancingSetTokenContract,
  VaultContract,
  SetTokenContract,
  TransferProxyContract,
  WhiteListContract,
} from '../../utils/contracts';

import { Core } from '../../artifacts/ts/Core';
import { ERC20 } from '../../artifacts/ts/ERC20';
import { ExchangeIssuanceModule } from '../../artifacts/ts/ExchangeIssuanceModule';
import { KyberNetworkWrapper } from '../../artifacts/ts/KyberNetworkWrapper';
import { LinearAuctionPriceCurve } from '../../artifacts/ts/LinearAuctionPriceCurve';
import { RebalancingSetExchangeIssuanceModule } from '../../artifacts/ts/RebalancingSetExchangeIssuanceModule';
import { RebalanceAuctionModule } from '../../artifacts/ts/RebalanceAuctionModule';
import { RebalancingSetToken } from '../../artifacts/ts/RebalancingSetToken';
import { RebalancingSetTokenFactory } from '../../artifacts/ts/RebalancingSetTokenFactory';
import { SetTokenFactory } from '../../artifacts/ts/SetTokenFactory';
import { TransferProxy } from '../../artifacts/ts/TransferProxy';
import { Vault } from '../../artifacts/ts/Vault';
import { ZeroExExchangeWrapper } from '../../artifacts/ts/ZeroExExchangeWrapper';
import { WhiteList } from '../../artifacts/ts/WhiteList';

import { asyncForEach } from '../../utils/array';
import networkConstants from '../network-constants';
import constants from '../constants';

interface ExchangeMapping {
  name: string;
  key: number;
}

export class TestCoreStage implements DeploymentStageInterface {

  private _web3: any;
  private _networkConstant: string;
  private _deployerAccount: any;

  private _coreContract: CoreContract;
  private _vaultContract: VaultContract;
  private _transferProxyContract: TransferProxyContract;
  private _whiteListContract: WhiteListContract;
  private _wbtcContract: ERC20DetailedContract;

  async deploy(web3: any): Promise<any> {
    console.log('Testing Core...');

    this._web3 = web3;
    this._networkConstant = getNetworkConstant();
    this._deployerAccount = this._web3.eth.accounts.privateKeyToAccount(getPrivateKey());

    this._web3.eth.accounts.wallet.add(this._deployerAccount);
    this._web3.eth.defaultAccount = this._deployerAccount.address;

    const coreAddress = await getContractAddress(Core.contractName);
    this._coreContract = await CoreContract.at(
      coreAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    const vaultAddress = await getContractAddress(Vault.contractName);
    this._vaultContract = await VaultContract.at(
      vaultAddress, this._web3, {from: this._deployerAccount.address}
    );

    const transferProxyAddress = await getContractAddress(TransferProxy.contractName);
    this._transferProxyContract = await TransferProxyContract.at(
      transferProxyAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    const whiteListAddress = await getContractAddress(WhiteList.contractName);
    this._whiteListContract = await WhiteListContract.at(
      whiteListAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    const wBtcAddress = await findDependency('WBTC');
    this._wbtcContract = await ERC20DetailedContract.at(
      wBtcAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    const btcEthAddress = await getContractAddress('BitEth7525RebalancingSetToken');

    const btcEthCollateralAddress = await getContractAddress('BitEth7525CollateralSet');
    const btcEthCollateralInstance = await SetTokenContract.at(
      btcEthCollateralAddress,
      this._web3,
      {from: this._deployerAccount.address}
    );

    console.log(`* issueModule`);
    const data0 = await this._coreContract.issueModule.getABIEncodedTransactionData(
      this._deployerAccount.address,
      this._coreContract.address,
      btcEthAddress,
      new BigNumber(1000000000000000),
    );
    await executeRevertTransaction(data0, this._coreContract.address, this._web3);

    console.log(`* issueInVaultModule`);
    const data1 = await this._coreContract.issueInVaultModule.getABIEncodedTransactionData(
      this._coreContract.address,
      btcEthAddress,
      new BigNumber(1000000000000000),
    );
    await executeRevertTransaction(data1, this._coreContract.address, this._web3);

    console.log(`* redeemModule`);
    const data2 = await this._coreContract.redeemModule.getABIEncodedTransactionData(
      this._deployerAccount.address,
      this._coreContract.address,
      btcEthAddress,
      new BigNumber(1000000000000000),
    );
    await executeRevertTransaction(data2, this._coreContract.address, this._web3);

    // console.log(`* Burn`);
    // const data1 = await btcEthCollateralInstance.burn.getABIEncodedTransactionData(
    //   this._deployerAccount.address,
    //   new BigNumber(1000),
    // );
    // await executeRevertTransaction(data1, btcEthCollateralInstance.address, this._web3);

    // console.log(`* mint`);
    // const data2 = await btcEthCollateralInstance.mint.getABIEncodedTransactionData(
    //   this._deployerAccount.address,
    //   new BigNumber(1000),
    // );
    // await executeRevertTransaction(data2, btcEthCollateralInstance.address, this._web3);

    // console.log(`* batchTransferBalanceModule`);
    // const data4 = await this._coreContract.batchTransferBalanceModule.getABIEncodedTransactionData(
    //   [wBtcAddress],
    //   this._deployerAccount.address,
    //   this._coreContract.address,
    //   [new BigNumber(1000)],
    // );
    // await executeRevertTransaction(data4, this._coreContract.address, this._web3);

    // console.log(`* transferModule`);
    // const data5 = await this._coreContract.transferModule.getABIEncodedTransactionData(
    //   wBtcAddress,
    //   new BigNumber(1000),
    //   this._deployerAccount.address,
    //   this._coreContract.address,
    // );
    // await executeRevertTransaction(data5, this._coreContract.address, this._web3);

    // console.log(`* batchTransferModule`);
    // const data6 = await this._coreContract.batchTransferModule.getABIEncodedTransactionData(
    //   [wBtcAddress],
    //   [new BigNumber(1000)],
    //   this._deployerAccount.address,
    //   this._coreContract.address,
    // );
    // await executeRevertTransaction(data6, this._coreContract.address, this._web3);

    // console.log(`* Batch Transfer WBTC from Vault to own account`);
    // const data3 = await this._coreContract.batchWithdrawModule.getABIEncodedTransactionData(
    //   this._deployerAccount.address,
    //   this._transferProxyContract.address,
    //   [wBtcAddress],
    //   [new BigNumber(1000)],
    // );
    // await executeRevertTransaction(data3, this._coreContract.address, this._web3);
  }
}
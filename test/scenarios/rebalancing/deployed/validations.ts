require('module-alias/register');

import * as chai from 'chai';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { Blockchain } from '@utils/blockchain';
ChaiSetup.configure();
const { expect } = chai;

import {
  CoreContract,
  RebalancingSetTokenContract,
  StandardTokenMockContract,
  TransferProxyContract,
  VaultContract,
} from '@utils/contracts';

import { AssetScenario } from './types';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { OracleWrapper } from '@utils/wrappers/oracleWrapper';
import { RebalancingWrapper } from '@utils/wrappers/rebalancingWrapper';

import {
  findDependency,
  getContractAddress,
} from '@deployments/utils/output-helper';

const blockchain = new Blockchain(web3);

export class RebalancingScenarioValidations {
    private _accounts: Address[];
    private _rebalanceProgram: AssetScenario;

    private _contractOwnerAddress: Address;
    private _coreWrapper: CoreWrapper;
    private _erc20Wrapper: ERC20Wrapper;
    private _oracleWrapper: OracleWrapper;
    private _rebalancingWrapper: RebalancingWrapper;

	private _rebalancingSetToken: RebalancingSetTokenContract;
	private _assetOne: StandardTokenMockContract;
	private _assetTwo: StandardTokenMockContract;

  private _core: CoreContract;
    private _transferProxy: TransferProxyContract;
    private _vault: VaultContract;

  constructor(accounts: Address[], rebalanceProgram: AssetScenario) {
      this._contractOwnerAddress = accounts[0];
      this._rebalanceProgram = rebalanceProgram;
      this._accounts = accounts;

      this._coreWrapper = new CoreWrapper(this._contractOwnerAddress, this._contractOwnerAddress);
      this._erc20Wrapper = new ERC20Wrapper(this._contractOwnerAddress);
      this._rebalancingWrapper = new RebalancingWrapper(
        this._contractOwnerAddress,
        this._coreWrapper,
        this._erc20Wrapper,
        blockchain
      );
      this._oracleWrapper = new OracleWrapper(this._contractOwnerAddress);
  }

  public async initialize(): Promise<void> {
    this._core = await this._coreWrapper.getDeployedCoreAsync();
      this._transferProxy = await this._coreWrapper.getDeployedTransferProxyAsync();
      this._vault = await this._coreWrapper.getDeployedVaultAsync();

    const {
        rebalancingSetName,
        assetOne,
        assetTwo,
      } = this._rebalanceProgram;

      const assetOneAddress = await findDependency(assetOne);
      const assetTwoAddress = await findDependency(assetTwo);
      const components = await this._erc20Wrapper.retrieveTokenInstancesAsync([assetOneAddress, assetTwoAddress]);
      this._assetOne = components[0];
      this._assetTwo = components[1];

      const rebalancingSetAddress = await getContractAddress(rebalancingSetName);
      this._rebalancingSetToken = await this._rebalancingWrapper.getRebalancingSetInstance(rebalancingSetAddress);
  }

  public async validateInitialState(): Promise<void> {
    const { rebalancingSetConfig } = this._rebalanceProgram;

    // Mints the correct amount of Set for the issuers
    const initialIssuances = rebalancingSetConfig.initialSetIssuances;
    for (let i = 0; i < initialIssuances.length; i++) {
        // Rebalancing Set Quantity
        const rebalancingSetQuantity = initialIssuances[i].amount;
        const issuer = this._accounts[initialIssuances[i].sender];

        await this.assertRebalancingSetBalance(rebalancingSetQuantity, issuer);
      }
  }

  public async assertRebalancingSetBalance(
    amount: BigNumber,
    account: string,
  ): Promise<void> {
    const tokenBalance = await this._rebalancingSetToken.balanceOf.callAsync(account);
    await expect(tokenBalance).to.be.bignumber.equal(amount);
  }
}



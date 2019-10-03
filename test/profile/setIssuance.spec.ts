require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import { BigNumber } from 'bignumber.js';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  CoreContract,
  SetTokenFactoryContract,
  TransferProxyContract,
  VaultContract
} from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ZERO } from '@utils/constants';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';
import { ERC20Helper } from '@utils/helpers/erc20Helper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const Core = artifacts.require('Core');
const blockchain = new Blockchain(web3);


contract('Issuance', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);
  const erc20Helper = new ERC20Helper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  describe('Issue', async () => {
    let core: CoreContract;
    let transferProxy: TransferProxyContract;
    let vault: VaultContract;
    let setTokenFactory: SetTokenFactoryContract;

    const subjectComponentsInSetToIssue: number[] = [1, 2, 3, 5, 10, 25, 50, 75];

    let subjectQuantityToIssue: BigNumber;
    let subjectSetToIssue: Address;
    let subjectToExcludeInRedeem: BigNumber;
    let subjectCaller: Address;

    beforeEach(async () => {
      await blockchain.saveSnapshotAsync();

      transferProxy = await coreHelper.deployTransferProxyAsync();
      vault = await coreHelper.deployVaultAsync();
      core = await coreHelper.deployCoreAsync(transferProxy, vault);
      setTokenFactory = await coreHelper.deploySetTokenFactoryAsync(core.address);

      await coreHelper.setDefaultStateAndAuthorizationsAsync(core, vault, transferProxy, setTokenFactory);
    });

    afterEach(async () => {
      await blockchain.revertAsync();
    });

    async function issueAsync(): Promise<string> {
      return core.issue.sendTransactionAsync(
        subjectSetToIssue,
        subjectQuantityToIssue,
        { from: subjectCaller },
      );
    }

    async function redeemAsync(): Promise<string> {
      return core.redeemAndWithdrawTo.sendTransactionAsync(
        subjectSetToIssue,
        subjectCaller,
        subjectQuantityToIssue,
        subjectToExcludeInRedeem,
        { from: subjectCaller },
      );
    }

    subjectComponentsInSetToIssue.forEach(function(componentCount) {
      it(`Issuing & Redeeming SetToken with ${componentCount} Components`, async () => {
        const components = await erc20Helper.deployTokensAsync(componentCount, ownerAccount);
        const setToken = await coreHelper.createSetTokenAsync(
          core,
          setTokenFactory.address,
          _.map(components, token => token.address),
          _.map(components, () => ether(4)),
          ether(2)
        );

        await erc20Helper.approveTransfersAsync(components, transferProxy.address);

        subjectSetToIssue = setToken.address;
        subjectQuantityToIssue = ether(2);
        subjectCaller = ownerAccount;

        const issueTxHash = await issueAsync();
        const issueReceipt = await web3.eth.getTransactionReceipt(issueTxHash);

        console.log('Issue Gas Cost: ', issueReceipt.gasUsed);

        subjectSetToIssue = setToken.address;
        subjectQuantityToIssue = ether(2);
        subjectToExcludeInRedeem = ZERO;
        subjectCaller = ownerAccount;

        const redeemTxHash = await redeemAsync();
        const redeemReceipt = await web3.eth.getTransactionReceipt(redeemTxHash);

        console.log('Redeem Gas Cost: ', redeemReceipt.gasUsed);
      });
    });
  });
});

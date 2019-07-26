require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreContract, TransferProxyContract, VaultContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');


contract('Core', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(Core.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(Core.abi);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('#constructor', async () => {
    const subjectCaller: Address = ownerAccount;

    beforeEach(async () => {
      transferProxy = await coreWrapper.deployTransferProxyAsync();
      vault = await coreWrapper.deployVaultAsync();
    });

    async function subject(): Promise<CoreContract> {
      return await coreWrapper.deployCoreAsync(
        transferProxy,
        vault,
        subjectCaller,
      );
    }

    it('should contain the correct address of the transfer proxy', async () => {
      const coreContract = await subject();

      const proxyAddress = await coreContract.transferProxy.callAsync();

      expect(proxyAddress).to.equal(transferProxy.address);
    });

    it('should contain the correct address of the vault', async () => {
      const coreContract = await subject();

      const vaultAddress = await coreContract.vault.callAsync();

      expect(vaultAddress).to.equal(vault.address);
    });
  });
});

require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreContract, TransferProxyContract, VaultContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreHelper } from '@utils/helpers/coreHelper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);

contract('Core', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  const coreHelper = new CoreHelper(ownerAccount, ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CoreContract.getAbi());
  });

  after(async () => {
    ABIDecoder.removeABI(CoreContract.getAbi());
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
      transferProxy = await coreHelper.deployTransferProxyAsync();
      vault = await coreHelper.deployVaultAsync();
    });

    async function subject(): Promise<CoreContract> {
      return await coreHelper.deployCoreAsync(
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

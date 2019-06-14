require('module-alias/register');

import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import { Address } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreContract, TransferProxyContract, VaultContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';
import { KyberNetworkWrapper } from '@utils/wrappers/kyberNetworkWrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { expect } = chai;
const blockchain = new Blockchain(web3);
const Core = artifacts.require('Core');


contract('Core', accounts => {
  const [
    ownerAccount,
    operatorAccount,
  ] = accounts;

  let transferProxy: TransferProxyContract;
  let vault: VaultContract;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);

  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  const kyberNetworkWrapper: KyberNetworkWrapper = new KyberNetworkWrapper();

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

    it.only('test kyber functions', async () => {
      const token = await erc20Wrapper.deployTokenAsync(operatorAccount);
      const token2 = await erc20Wrapper.deployTokenAsync(operatorAccount);

      await kyberNetworkWrapper.setExpectedRateOnKyberReserve();

      await kyberNetworkWrapper.enableTokensForReserve(token.address);
      await kyberNetworkWrapper.enableTokensForReserve(token2.address);

      await kyberNetworkWrapper.setUpConversionRates(
        [token.address, token2.address],
        [new BigNumber(549000000000000000000), new BigNumber(61079439106994400000)],
        [new BigNumber(1813123931381047), new BigNumber(16400993988000000)],
      );

      await kyberNetworkWrapper.approveToReserve(
        token,
        new BigNumber(1000000000000000000000000000),
        operatorAccount,
      );

      await kyberNetworkWrapper.approveToReserve(
        token2,
        new BigNumber(1000000000000000000000000000),
        operatorAccount,
      );

      await web3.eth.sendTransaction(
        {
          to: '0x038F9B392Fb9A9676DbAddF78EA5fdbf6C7d9710',
          from: operatorAccount,
          value: '1000000000000000000'
        }
      );

      // Get Kyber Rate
      const ethAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
      console.log("TOken address", token.address, ethAddress);
      await kyberNetworkWrapper.getKyberRate(
        ethAddress,
        token.address,
        // token2.address,
        new BigNumber(100000000000000000000),
      );

      await subject();
    });
  });
});

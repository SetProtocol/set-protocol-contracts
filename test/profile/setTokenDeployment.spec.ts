require('module-alias/register');

import * as _ from 'lodash';
import * as setProtocolUtils from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';
import { Address, Bytes } from 'set-protocol-utils';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import { CoreContract, SetTokenFactoryContract } from '@utils/contracts';
import { Blockchain } from '@utils/blockchain';
import { ether } from '@utils/units';
import { getWeb3 } from '@utils/web3Helper';

import { CoreWrapper } from '@utils/wrappers/coreWrapper';
import { ERC20Wrapper } from '@utils/wrappers/erc20Wrapper';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolUtils: SetUtils } = setProtocolUtils;
const blockchain = new Blockchain(web3);


contract('Deployment', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  const coreWrapper = new CoreWrapper(ownerAccount, ownerAccount);
  const erc20Wrapper = new ERC20Wrapper(ownerAccount);

  describe('SetToken', async () => {
    let core: CoreContract;
    let factory: SetTokenFactoryContract;

    const subjectComponentsInSetToDeploy: number[] = [1, 2, 3, 5, 10, 25, 50, 75];

    let subjectFactoryAddress: Address;
    let subjectComponents: Address[];
    let subjectUnits: BigNumber[];
    let subjectNaturalUnit: BigNumber;
    let subjectName: Bytes;
    let subjectSymbol: Bytes;
    let subjectCallData: Bytes;
    let subjectCaller: Address;

    beforeEach(async () => {
      await blockchain.saveSnapshotAsync();

      core = await coreWrapper.deployCoreAndDependenciesAsync();
      factory = await coreWrapper.deploySetTokenFactoryAsync(core.address);
      await coreWrapper.addFactoryAsync(core, factory);
    });

    afterEach(async () => {
      await blockchain.revertAsync();
    });

    async function deploySetToken(): Promise<string> {
      return core.create.sendTransactionAsync(
        subjectFactoryAddress,
        subjectComponents,
        subjectUnits,
        subjectNaturalUnit,
        subjectName,
        subjectSymbol,
        subjectCallData,
        { from: subjectCaller },
      );
    }

    _.forEach(subjectComponentsInSetToDeploy, function(componentCount) {
      it(`Deploying SetToken with ${componentCount} Components`, async () => {
        const components = await erc20Wrapper.deployTokensAsync(componentCount, ownerAccount);

        subjectFactoryAddress = factory.address;
        subjectComponents = _.map(components, token => token.address);
        subjectUnits = _.map(components, () => ether(4));
        subjectNaturalUnit = ether(2);
        subjectName = SetUtils.stringToBytes('Set Token');
        subjectSymbol = SetUtils.stringToBytes('SET');
        subjectCallData = '0x0';
        subjectCaller = ownerAccount;

        const txHash = await deploySetToken();
        const receipt = await web3.eth.getTransactionReceipt(txHash);

        console.log('Gas Cost: ', receipt.gasUsed);
      });
    });
  });
});

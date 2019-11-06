require('module-alias/register');

import * as _ from 'lodash';
import * as ABIDecoder from 'abi-decoder';
import * as chai from 'chai';
import * as setProtocolUtils from 'set-protocol-utils';
import { Address, Bytes } from 'set-protocol-utils';
import { BigNumber } from 'bignumber.js';

import ChaiSetup from '@utils/chaiSetup';
import { BigNumberSetup } from '@utils/bigNumberSetup';
import {
  FeedFactoryContract,
  PriceFeedContract,
  MedianContract,
} from '@utils/contracts';
import { expectRevertError } from '@utils/tokenAssertions';
import { Blockchain } from '@utils/blockchain';
import { ZERO } from '@utils/constants';
import { getWeb3 } from '@utils/web3Helper';

import { CompoundHelper } from '@utils/helpers/compoundHelper';
import { CErc20ABI } from '@utils/external/abis/compound/CErc20ABI';

BigNumberSetup.configure();
ChaiSetup.configure();
const web3 = getWeb3();
const { SetProtocolTestUtils: SetTestUtils, SetProtocolUtils: SetUtils } = setProtocolUtils;
const { expect } = chai;
const blockchain = new Blockchain(web3);
const setUtils = new SetUtils(web3);


contract('Compound Helpers', accounts => {
  const [
    ownerAccount,
  ] = accounts;

  const compoundHelper = new CompoundHelper(ownerAccount);

  before(async () => {
    ABIDecoder.addABI(CErc20ABI);
  });

  after(async () => {
    ABIDecoder.removeABI(CErc20ABI);
  });

  beforeEach(async () => {
    await blockchain.saveSnapshotAsync();
  });

  afterEach(async () => {
    await blockchain.revertAsync();
  });

  describe('Test', async () => {
    it('does things', async () => {
      await compoundHelper.setup();
    });
  });

});

import * as chai from "chai";
import * as _ from "lodash";

import * as ABIDecoder from "abi-decoder";
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "./utils/units";

// Types
import { Address, UInt, Log } from "../types/common.js";

// Contract types
import { StandardTokenMockContract } from "../types/generated/standard_token_mock";
import { SetTokenContract } from "../types/generated/set_token";
import { SetTokenRegistryContract } from "../types/generated/set_token_registry";

// Artifacts
const SetToken = artifacts.require("SetToken");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const SetTokenRegistry = artifacts.require("SetTokenRegistry");

// Testing Set up
import { BigNumberSetup } from "./config/bignumber_setup";
import ChaiSetup from "./config/chai_setup";
BigNumberSetup.configure();
ChaiSetup.configure();
const { expect, assert } = chai;

import { getFormattedLogsFromTxHash } from "./logs/log_utils";

import {
  getExpectedCreateLogs,
} from "./logs/SetTokenRegistry";

import {
  assertTokenBalance,
  expectInvalidOpcodeError,
  expectRevertError,
} from "./utils/tokenAssertions";
import {
  INVALID_OPCODE,
  NULL_ADDRESS,
  REVERT_ERROR,
} from "./constants/constants";

contract("{Set} Registry", (accounts) => {
  const [ testAccount ] = accounts;

  const initialTokens: BigNumber = ether(100000000000);
  const TX_DEFAULTS = { from: testAccount, gas: 7000000 };

  let setRegistry: SetTokenRegistryContract;
  let components: any[] = [];
  let componentAddresses: Address[] = [];
  let units: BigNumber[] = [];

  const reset = async () => {
    setRegistry = null;
    components = [];
    componentAddresses = [];
    units = [];
  };

  const resetAndDeploySetRegistry = async () => {
    reset();
    const setRegistryTruffle = await SetTokenRegistry.new();

    const setRegistryWeb3Contract = web3.eth
      .contract(setRegistryTruffle.abi)
      .at(setRegistryTruffle.address);

    setRegistry = new SetTokenRegistryContract(setRegistryWeb3Contract, TX_DEFAULTS);
  };

  const deployRegistryAndTokens = async (numComponents: number) => {
    resetAndDeploySetRegistry();
    const componentPromises = _.times(numComponents, (index) => {
      // Generate our own units
      const randomInt = Math.ceil(Math.random() * Math.floor(4)); // Rand int <= 4
      units.push(gWei(randomInt));

      return StandardTokenMock.new(testAccount, initialTokens, `Component ${index}`, index, TX_DEFAULTS);
    });

    components = await Promise.all(componentPromises);
    componentAddresses = _.map(components, (component) => component.address);
  };

  // const deployRegistryTokensAndSets = async (quantity: number) => {
  //   await deployRegistryAndTokens(2);

  //   const newSetPromises = _.times(quantity, (index) => {
  //     return setRegistry.create.sendTransactionAsync(
  //       componentAddresses,
  //       units,
  //       `Set ${index}`,
  //       `${index}`,
  //     );
  //   });

  //   await Promise.all(newSetPromises);
  // };

  before(async () => {
    // Initialize ABI Decoders for deciphering log receipts
    ABIDecoder.addABI(SetTokenRegistry.abi);
  });

  after(async () => {
    ABIDecoder.removeABI(SetTokenRegistry.abi);
  });

  describe("Blank State", async () => {
    beforeEach(async () => {
      await resetAndDeploySetRegistry();
    });

    it("should be in a blank state", async () => {
      expect(await setRegistry.getSetCount.callAsync()).to.bignumber.equal(new BigNumber(0));
      const setAddresses = await setRegistry.getSetAddresses.callAsync();
      expect(setAddresses.length).to.equal(0);
    });
  });

  describe("Create", async () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployRegistryAndTokens(1);
      });

      it("should work", async () => {
        const setName = "Test A";
        const setSymbol = "A";

        const txHash: string = await setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          setName,
          setSymbol,
        );

        expect(await setRegistry.getSetCount.callAsync()).to.bignumber.equal(new BigNumber(1));
        const setAddresses = await setRegistry.getSetAddresses.callAsync();
        expect(setAddresses.length).to.equal(1);

        const [newSetAddress] = setAddresses;

        const setMetaData = await setRegistry.getSetMetadata.callAsync(newSetAddress);
        assert.strictEqual(setMetaData[0], newSetAddress);
        assert.strictEqual(setMetaData[1], setName);
        assert.strictEqual(setMetaData[2], setSymbol);

        expect(await setRegistry.getSetAddressByName.callAsync(setName)).to.equal(newSetAddress);
        expect(await setRegistry.getSetAddressBySymbol.callAsync(setSymbol)).to.equal(newSetAddress);

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedCreateLogs(
          testAccount,
          newSetAddress,
          setName,
          setSymbol,
          setRegistry.address,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
      });

      it("should fail if there already is a Set with the same name", async () => {
        const setName = "Test A";
        const setSymbol = "A";

        await setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          setName,
          setSymbol,
        );

        await expectRevertError(setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          setName,
          "B",
        ));
      });

      it("should fail if there already is a Set with the same symbol", async () => {
        const setName = "Test A";
        const setSymbol = "A";

        await setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          setName,
          setSymbol,
        );

        await expectRevertError(setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          "Test B",
          setSymbol,
        ));
      });
    });
  });

  // describe('{Set Registry Add}', () => {
  //   let unitsA = 1;
  //   let newSet;
  //   beforeEach(async () => {
  //     newSet = await SetToken.new([tokenA.address], [unitsA], 'Set of A', 'A');
  //   });

  //   it('should add a set to the registry', async () => {
  //     const name = await newSet.name();

  //     const symbol = await newSet.symbol();

  //     const added = await setRegistry.add(newSet.address, name, symbol);

  //     const metadata = await setRegistry.getSetMetadata(newSet.address);

  //     assert.equal(name, metadata[1], 'Name is wrong');
  //     assert.equal(symbol, metadata[2], 'Symbol is wrong');
  //     assert.equal(added.logs[0].event, 'SetTokenAdded', 'Event is wrong');
  //     assert.equal(added.logs[0].args.sender, accounts[0], 'Sender is wrong');
  //     assert.deepEqual(added.logs[0].args.name, name, 'Log name is wrong');
  //     assert.deepEqual(
  //       added.logs[0].args.symbol,
  //       symbol,
  //       'Log symbol is wrong',
  //     );
  //   });
  // });

  // describe('{Set Registry Removal}', async () => {
  //   let unitsA = 1;
  //   let setName = 'AB Set';
  //   let setSymbol = 'AB';
  //   let newSetTokenAddress;
  //   let removeReceipt;

  //   beforeEach(async () => {
  //     var createReceipt = await setRegistry.create(
  //       [tokenA.address],
  //       [unitsA],
  //       setName,
  //       setSymbol,
  //       { from: testAccount },
  //     );

  //     var createReceiptLogs = createReceipt.logs;
  //     assert.strictEqual(
  //       createReceiptLogs.length,
  //       1,
  //       'There should be a log for fund creation',
  //     );

  //     newSetTokenAddress = createReceiptLogs[0].args.setAddress;
  //     assert.exists(newSetTokenAddress, 'New Set Should Exist');

  //     removeReceipt = await setRegistry.remove(newSetTokenAddress, 0);
  //   });

  //   it('should have the correct items in the logs', () => {
  //     const removeLogs = removeReceipt.logs[0].args;
  //     assert.strictEqual(removeLogs.sender, testAccount);
  //     assert.strictEqual(removeLogs.setAddress, newSetTokenAddress);
  //     assert.strictEqual(removeLogs.name, setName);
  //     assert.strictEqual(removeLogs.symbol, setSymbol);
  //   });

  //   it('should have no more sets', async () => {
  //     let setAddresses = await setRegistry.getSetAddresses();

  //     let setTokenCount = await setRegistry.setCount();
  //     assert.strictEqual(setTokenCount.toString(), '0');
  //   });

  //   it('should have the name and symbol removed', async () => {
  //     let setNameAddress = await setRegistry.getSetAddressByName(setName);
  //     assert.strictEqual(parseInt(setNameAddress, 16), 0);

  //     let setSymbolAddress = await setRegistry.getSetAddressBySymbol(setSymbol);
  //     assert.strictEqual(parseInt(setSymbolAddress, 16), 0);
  //   });
  // });
});

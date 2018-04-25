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

  const reset = async () => {
    setRegistry = null;
  };

  before(async () => {
    // Initialize ABI Decoders for deciphering log receipts
    ABIDecoder.addABI(SetTokenRegistry.abi);

    const setRegistryTruffle = await SetTokenRegistry.new();

    const setRegistryWeb3Contract = web3.eth
      .contract(setRegistryTruffle.abi)
      .at(setRegistryTruffle.address);

    setRegistry = new SetTokenRegistryContract(setRegistryWeb3Contract, TX_DEFAULTS);
  });

  after(async () => {
    ABIDecoder.removeABI(SetTokenRegistry.abi);
  });

  describe("Blank State", async () => {
    it("should be in a blank state", async () => {
      expect(await setRegistry.getSetCount.callAsync()).to.bignumber.equal(new BigNumber(0));
      const setAddresses = await setRegistry.getSetAddresses.callAsync();
      expect(setAddresses.length).to.equal(0);
    });
  });

  describe("Create", async () => {
    let tokenA: any;
    const units: BigNumber[] = [gWei(1)];
    before(async () => {
      tokenA = await StandardTokenMock.new(testAccount, initialTokens, "Component A", "A");
    });

    it("should work", async () => {
      const setName = "Test A";
      const setSymbol = "A";

      const txHash: string = await setRegistry.create.sendTransactionAsync(
        [tokenA.address],
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

      // const addressSymbol = await setRegistry.setAddressByHashedName.callAsync(
      //   '03783fac2efed8fbc9ad443e592ee30e61d65f471140c10ca155e937b435b760',
      // );
      // console.log(addressSymbol);
    });
  });

  // describe('{Set} Registry after creation', async () => {
  //   let newSetTokenAddress;
  //   let createReceipt;

  //   beforeEach(async () => {
  //     createReceipt = await setRegistry.create(
  //       [tokenA.address],
  //       [unitsA],
  //       setName,
  //       setSymbol,
  //       { from: testAccount },
  //     );
  //     newSetTokenAddress = createReceipt.logs[0].args.setAddress;
  //   });

  //   it('should have the correct number of sets and the correct set', async () => {
  //     let setTokenCount = await setRegistry.setCount();
  //     assert.strictEqual(setTokenCount.toString(), '1');

  //     let setAddresses = await setRegistry.getSetAddresses();
  //     assert.strictEqual(setAddresses.length, 1, 'There should be one set');
  //     assert.strictEqual(setAddresses[0], newSetTokenAddress);
  //   });

  //   it('should have the correct metadata', async () => {
  //     let setMetaData = await setRegistry.getSetMetadata(newSetTokenAddress);
  //     assert.strictEqual(setMetaData[0], newSetTokenAddress);
  //     assert.strictEqual(setMetaData[1], setName);
  //     assert.strictEqual(setMetaData[2], setSymbol);
  //   });

  //   it('should have the correct setToken properties', async () => {
  //     setToken = await SetToken.at(newSetTokenAddress);

  //     // Assert that all the right properties exist on the fund
  //     assert.strictEqual(await setToken.tokens(0), tokenA.address);

  //     let expectedUnitsA = await setToken.units(0);

  //     assert.strictEqual(expectedUnitsA.toString(), unitsA.toString());
  //   });
  // });

  // it('should not allow a user to create a token basket with the same name', async () => {
  //   let unitsA = 1;
  //   await setRegistry.create([tokenA.address], [unitsA], 'AB Set', 'AB', {
  //     from: testAccount,
  //   });
  //   return expectedExceptionPromise(
  //     () =>
  //       setRegistry.create([tokenA.address], [unitsA], 'AB Set', 'BC', {
  //         from: testAccount,
  //       }),
  //     3000000,
  //   );
  // });

  // it('should not allow a user to create a token basket with the same symbol', async () => {
  //   let unitsA = 1;
  //   await setRegistry.create([tokenA.address], [unitsA], 'AB Set', 'AB', {
  //     from: testAccount,
  //   });

  //   return expectedExceptionPromise(
  //     () =>
  //       setRegistry.create([tokenA.address], [unitsA], 'BC Set', 'AB', {
  //         from: testAccount,
  //       }),
  //     3000000,
  //   );
  // });

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

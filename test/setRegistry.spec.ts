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
import { SetTokenFactoryContract } from "../types/generated/set_token_factory";
import { SetTokenRegistryContract } from "../types/generated/set_token_registry";

// Artifacts
const SetToken = artifacts.require("SetToken");
const StandardTokenMock = artifacts.require("StandardTokenMock");
const SetTokenFactory = artifacts.require("SetTokenFactory");
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
  assertSetCountInRegistry,
  assertSetMetadataInRegistry,
} from "./utils/registryAssertions";
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

interface ExpectedSetMetadata {
  address: string;
  setName: string;
  setSymbol: string;
}

contract("{Set} Registry", (accounts) => {
  const [ testAccount, notRegistryOwner ] = accounts;

  const initialTokens: BigNumber = ether(100000000000);
  const TX_DEFAULTS = { from: testAccount, gas: 7000000 };
  const STANDARD_SET_DEFAULT = {
    name: "Test A",
    symbol: "A",
  };

  let setRegistry: SetTokenRegistryContract;
  let setsTruffle: SetTokenContract[] = [];
  let setDeployedAddresses: Address[] = [];
  let expectedSetMetadata: ExpectedSetMetadata[] = [];
  let components: any[] = [];
  let componentAddresses: Address[] = [];
  let units: BigNumber[] = [];

  const reset = async () => {
    setRegistry = null;
    components = [];
    componentAddresses = [];
    units = [];
    expectedSetMetadata = [];
  };

  const resetAndDeploySetRegistry = async () => {
    reset();
    const setFactoryTruffle = await SetTokenFactory.new(TX_DEFAULTS);
    const setRegistryTruffle = await SetTokenRegistry.new(setFactoryTruffle.address, TX_DEFAULTS);

    const setRegistryWeb3Contract = web3.eth
      .contract(setRegistryTruffle.abi)
      .at(setRegistryTruffle.address);

    setRegistry = new SetTokenRegistryContract(setRegistryWeb3Contract, TX_DEFAULTS);
  };

  const deployRegistryAndTokens = async (numComponents: number) => {
    await resetAndDeploySetRegistry();
    const componentPromises = _.times(numComponents, (index) => {
      // Generate our own units
      const randomInt = Math.ceil(Math.random() * Math.floor(4)); // Rand int <= 4
      units.push(gWei(randomInt));

      return StandardTokenMock.new(testAccount, initialTokens, `Component ${index}`, index, TX_DEFAULTS);
    });

    components = await Promise.all(componentPromises);
    componentAddresses = _.map(components, (component) => component.address);
  };

  const deployRegistryTokensAndSets = async (numComponents: number, numSets: number) => {
    await deployRegistryAndTokens(numComponents);

    // Deploy a new Set from scratch
    const setPromises = _.times(numSets, (index) => {
      return SetToken.new(componentAddresses, units, TX_DEFAULTS);
    });

    setsTruffle = await Promise.all(setPromises);

    setDeployedAddresses = _.map(setsTruffle, (set) => set.address);
  };

  const deployRegistryWithSetAdded = async (numComponents: number, numSets: number) => {
    await deployRegistryTokensAndSets(numComponents, numSets);
    const setAddPromises = _.each(setDeployedAddresses, (setAddress, index) => {
      const setName = `Test ${index}`;
      const setSymbol = `${index}`;

      expectedSetMetadata.push({
        address: setAddress,
        setName,
        setSymbol,
      });

      return setRegistry.add.sendTransactionAsync(
        setAddress,
        setName,
        setSymbol,
      );
    });

    await Promise.all(setAddPromises);
  };

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
        const txHash: string = await setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          STANDARD_SET_DEFAULT.name,
          STANDARD_SET_DEFAULT.symbol,
        );

        assertSetCountInRegistry(setRegistry, new BigNumber(1));

        const setAddresses = await setRegistry.getSetAddresses.callAsync();
        const [newSetAddress] = setAddresses;

        const setMetaData = await setRegistry.getSetMetadata.callAsync(newSetAddress);
        assert.strictEqual(setMetaData[0], newSetAddress);
        assert.strictEqual(setMetaData[1], STANDARD_SET_DEFAULT.name);
        assert.strictEqual(setMetaData[2], STANDARD_SET_DEFAULT.symbol);

        expect(await setRegistry.getSetAddressByName.callAsync(STANDARD_SET_DEFAULT.name)).to.equal(newSetAddress);
        expect(await setRegistry.getSetAddressBySymbol.callAsync(STANDARD_SET_DEFAULT.symbol)).to.equal(newSetAddress);

        const formattedLogs = await getFormattedLogsFromTxHash(txHash);
        const expectedLogs = getExpectedCreateLogs(
          testAccount,
          newSetAddress,
          STANDARD_SET_DEFAULT.name,
          STANDARD_SET_DEFAULT.symbol,
          setRegistry.address,
        );

        expect(JSON.stringify(formattedLogs)).to.equal(JSON.stringify(expectedLogs));
      });

      it("should fail if there already is a Set with the same name", async () => {
        await setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          STANDARD_SET_DEFAULT.name,
          STANDARD_SET_DEFAULT.symbol,
        );

        await expectRevertError(setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          STANDARD_SET_DEFAULT.name,
          "B",
        ));
      });

      it("should fail if there already is a Set with the same symbol", async () => {
        await setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          STANDARD_SET_DEFAULT.name,
          STANDARD_SET_DEFAULT.symbol,
        );

        await expectRevertError(setRegistry.create.sendTransactionAsync(
          componentAddresses,
          units,
          "Test B",
          STANDARD_SET_DEFAULT.symbol,
        ));
      });
    });
  });

  describe("Add", async () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployRegistryTokensAndSets(2, 2);
      });

      it("should work", async () => {
        const [deployedSet] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await setRegistry.add.sendTransactionAsync(
          deployedSet,
          name,
          symbol,
        );

        assertSetCountInRegistry(setRegistry, new BigNumber(1));
        assertSetMetadataInRegistry(setRegistry, deployedSet, deployedSet, name, symbol);
      });

      it("should fail if there already is a Set with the same address", async () => {
        const [deployedSetA] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await setRegistry.add.sendTransactionAsync(
          deployedSetA,
          name,
          symbol,
        );

        await expectRevertError(setRegistry.add.sendTransactionAsync(
          deployedSetA,
          name,
          symbol,
        ));
      });

      it("should fail if there already is a Set with the same name", async () => {
        const [deployedSetA, deployedSetB] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await setRegistry.add.sendTransactionAsync(
          deployedSetA,
          name,
          symbol,
        );

        await expectRevertError(setRegistry.add.sendTransactionAsync(
          deployedSetB,
          `${name}NotSame`,
          symbol,
        ));
      });

      it("should fail if there already is a Set with the same symbol", async () => {
        const [deployedSetA, deployedSetB] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await setRegistry.add.sendTransactionAsync(
          deployedSetA,
          name,
          symbol,
        );

        await expectRevertError(setRegistry.add.sendTransactionAsync(
          deployedSetB,
          name,
          `${symbol}NotSame`,
        ));
      });

      it("should fail if not called by owner", async () => {
        const [deployedSetA] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await expectRevertError(setRegistry.add.sendTransactionAsync(
          deployedSetA,
          name,
          symbol,
          { from: notRegistryOwner },
        ));
      });
    });
  });

  describe("Remove", async () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployRegistryTokensAndSets(2, 2);

        const [deployedSetA, deployedSetB] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await setRegistry.add.sendTransactionAsync(
          deployedSetA,
          name,
          symbol,
        );

        await setRegistry.add.sendTransactionAsync(
          deployedSetB,
          `${name}NotSame`,
          `${symbol}NotSame`,
        );
      });

      it("should work", async () => {
        const [deployedSetA] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await setRegistry.remove.sendTransactionAsync(
          deployedSetA,
          new BigNumber(0), // Index 0
        );

        assertSetCountInRegistry(setRegistry, new BigNumber(1));
        assertSetMetadataInRegistry(setRegistry, deployedSetA, NULL_ADDRESS, "", "");
      });

      it("should fail if the index inputted is incorrect", async () => {
        const [deployedSetA] = setDeployedAddresses;
        await expectRevertError(setRegistry.remove.sendTransactionAsync(
          deployedSetA,
          new BigNumber(1), // Wrong Index
        ));
      });

      it("should fail if not called by owner", async () => {
        const [deployedSetA] = setDeployedAddresses;
        const { name, symbol } = STANDARD_SET_DEFAULT;

        await expectRevertError(setRegistry.remove.sendTransactionAsync(
          deployedSetA,
          new BigNumber(0), // Index 0
          { from: notRegistryOwner },
        ));
      });
    });
  });

  describe("Modify Set Name", async () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployRegistryWithSetAdded(2, 2);
      });

      it("should work", async () => {
        const newSetName = "NEWNAME";
        const [deployedSetA] = setDeployedAddresses;
        await setRegistry.modifySetName.sendTransactionAsync(
          deployedSetA,
          newSetName,
          TX_DEFAULTS,
        );

        const [firstSetMetadata] = expectedSetMetadata;
        const { address, setSymbol } = firstSetMetadata;
        assertSetMetadataInRegistry(setRegistry, deployedSetA, address, newSetName, setSymbol);
      });

      it("should fail if not called by owner", async () => {
        const newSetName = "NEWNAME";
        const [deployedSetA] = setDeployedAddresses;

        await expectRevertError(setRegistry.modifySetName.sendTransactionAsync(
          deployedSetA,
          newSetName,
          { from: notRegistryOwner },
        ));
      });
    });
  });

  describe("Modify Set Symbol", async () => {
    describe("of Standard Set", async () => {
      beforeEach(async () => {
        await deployRegistryWithSetAdded(2, 2);
      });

      it("should work", async () => {
        const newSymbolName = "NEWSYMBOL";
        const [deployedSetA] = setDeployedAddresses;
        await setRegistry.modifySetSymbol.sendTransactionAsync(
          deployedSetA,
          newSymbolName,
          TX_DEFAULTS,
        );

        const [firstSetMetadata] = expectedSetMetadata;
        const { address, setName } = firstSetMetadata;
        assertSetMetadataInRegistry(setRegistry, deployedSetA, address, setName, newSymbolName);
      });

      it("should fail if not called by owner", async () => {
        const newSetSymbol = "NEWSYMBOL";
        const [deployedSetA] = setDeployedAddresses;

        await expectRevertError(setRegistry.modifySetSymbol.sendTransactionAsync(
          deployedSetA,
          newSetSymbol,
          { from: notRegistryOwner },
        ));
      });
    });
  });
});

import { BigNumber } from "bignumber.js";
import { ether, gWei } from "../utils/units";

export const DEFAULT_GAS = 7000000;
export const INVALID_OPCODE = "invalid opcode";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const REVERT_ERROR = "revert";
export const STANDARD_INITIAL_TOKENS: BigNumber = ether(100000000000);
export const STANDARD_QUANTITY_ISSUED: BigNumber = ether(10);
export const STANDARD_NATURAL_UNIT = ether(1);
export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);
import { BigNumber } from "bignumber.js";
import { ether, gWei } from "../utils/units";

export const INVALID_OPCODE = "invalid opcode";
export const REVERT_ERROR = "revert";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const STANDARD_INITIAL_TOKENS: BigNumber = ether(100000000000);
export const STANDARD_QUANTITY_ISSUED: BigNumber = ether(10);
export const STANDARD_NATURAL_UNIT = ether(1);
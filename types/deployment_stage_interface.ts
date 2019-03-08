import BigNumber from 'bignumber.js';

export interface DeploymentStageInterface {
  deploy(web3: any): Promise<any>;
}

export interface DeployedSetInfo {
	PRICE_PRECISION: BigNumber;
    WBTC_MULTIPLIER: BigNumber;
    WETH_MULTIPLIER: BigNumber;
    MANAGER_NAME: string;
    COLLATERAL_NAME: string;
    SET_NAME: string;
    SET_SYMBOL: string;
}
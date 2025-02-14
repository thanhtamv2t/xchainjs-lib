import { ethers, BigNumber } from 'ethers';
import { BaseAmount } from '@xchainjs/xchain-util';
import * as C from '@xchainjs/xchain-client';
import { FeeOptionKey } from '@xchainjs/xchain-client';
export declare type Address = string;
export declare enum Network {
    TEST = "ropsten",
    MAIN = "homestead"
}
export declare type ClientUrl = {
    testnet: string;
    mainnet: string;
};
export declare type ExplorerUrl = {
    testnet: string;
    mainnet: string;
};
export declare type TxOverrides = {
    nonce?: ethers.BigNumberish;
    gasLimit: ethers.BigNumberish;
    gasPrice?: ethers.BigNumberish;
    data?: ethers.BytesLike;
    value?: ethers.BigNumberish;
};
export declare type InfuraCreds = {
    projectId: string;
    projectSecret?: string;
};
export declare type GasPrices = Record<C.FeeOptionKey, BaseAmount>;
export declare type FeesParams = C.FeesParams & C.TxParams;
export declare type FeesWithGasPricesAndLimits = {
    fees: C.Fees;
    gasPrices: GasPrices;
    gasLimit: BigNumber;
};
export declare type ApproveParams = {
    walletIndex: number;
    spender: Address;
    sender: Address;
    feeOptionKey?: FeeOptionKey;
    amount?: BaseAmount;
};

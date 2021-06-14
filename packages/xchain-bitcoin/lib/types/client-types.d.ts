import { Address, FeeOptionKey, Fees, Network } from '@xchainjs/xchain-client';
export declare type FeeRate = number;
export declare type FeeRates = Record<FeeOptionKey, FeeRate>;
export declare type FeesWithRates = {
    rates: FeeRates;
    fees: Fees;
};
export declare type NormalTxParams = {
    addressTo: string;
    amount: number;
    feeRate: number;
};
export declare type VaultTxParams = NormalTxParams & {
    memo: string;
};
export declare type GetChangeParams = {
    valueOut: number;
    sochainUrl: string;
    network: Network;
    address: Address;
};

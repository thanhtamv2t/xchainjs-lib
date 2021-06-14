/// <reference types="node" />
import { Address, Balance, FeeOptionKey, Fees } from '@xchainjs/xchain-client';
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
export declare type DerivePath = {
    mainnet: string;
    testnet: string;
};
export declare type ClientUrl = {
    testnet: string;
    mainnet: string;
};
export declare type Witness = {
    value: number;
    script: Buffer;
};
export declare type UTXO = {
    hash: string;
    index: number;
    value: number;
    witnessUtxo: Witness;
    address: Address;
    txHex: string;
};
export declare type UTXOs = UTXO[];
export declare type GetChangeParams = {
    valueOut: number;
    bchBalance: Balance;
};

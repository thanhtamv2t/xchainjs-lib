import { Address } from '@xchainjs/xchain-client/lib';
import { BaseAmount } from '@xchainjs/xchain-util/lib';
export declare type UtxoData = {
    txid: string;
    index: number;
    value: number;
    pkscript: string;
};
export declare type BalanceData = {
    address: Address;
    confirmed: number;
    unconfirmed: number;
    utxo: number;
    txs: number;
    received: number;
};
export declare const getBalance: (address: string) => Promise<BaseAmount>;
export declare const getUnspentTxs: (address: string) => Promise<UtxoData[]>;
export declare const getConfirmedUnspentTxs: (address: string) => Promise<UtxoData[]>;

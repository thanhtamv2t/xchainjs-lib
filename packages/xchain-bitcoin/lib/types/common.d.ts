/// <reference types="node" />
import { Network } from '../client';
export declare type Witness = {
    value: number;
    script: Buffer;
};
export declare type UTXO = {
    hash: string;
    index: number;
    value: number;
    witnessUtxo: Witness;
    txHex: string;
};
export declare type UTXOs = UTXO[];
export declare type BroadcastTxParams = {
    network: Network;
    txHex: string;
    blockstreamUrl: string;
};
export declare type DerivePath = {
    mainnet: string;
    testnet: string;
};

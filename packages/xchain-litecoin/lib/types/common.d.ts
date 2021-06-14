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
};
export declare type UTXOs = UTXO[];
export declare type NodeAuth = {
    username: string;
    password: string;
};
export declare type BroadcastTxParams = {
    network: Network;
    txHex: string;
    nodeUrl: string;
    auth?: NodeAuth;
};

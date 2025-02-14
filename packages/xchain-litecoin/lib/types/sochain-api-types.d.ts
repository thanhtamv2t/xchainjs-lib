import { Network, TxHash } from '@xchainjs/xchain-client';
export declare type AddressParams = {
    sochainUrl: string;
    network: Network;
    address: string;
    startingFromTxId?: string;
};
export declare type TxHashParams = {
    sochainUrl: string;
    network: Network;
    hash: TxHash;
};
export interface SochainResponse<T> {
    data: T;
    status: string;
}
export interface TxIO {
    input_no: number;
    value: string;
    address: string;
    type: string;
    script: string;
}
export interface Transaction {
    network: string;
    txid: string;
    blockhash: string;
    confirmations: number;
    time: number;
    inputs: TxIO[];
    outputs: TxIO[];
}
export declare type LtcAddressUTXO = {
    txid: string;
    output_no: number;
    script_asm: string;
    script_hex: string;
    value: string;
    confirmations: number;
    time: number;
};
export declare type LtcAddressTxDTO = {
    txid: string;
    block_no: number;
    confirmations: number;
    time: number;
    req_sigs: number;
    script_asm: string;
    script_hex: string;
};
export declare type LtcAddressDTO = {
    network: string;
    address: string;
    balance: string;
    received_value: string;
    pending_value: string;
    total_txs: number;
    txs: LtcAddressTxDTO[];
};
export declare type LtcGetBalanceDTO = {
    network: string;
    address: string;
    confirmed_balance: string;
    unconfirmed_balance: string;
};
export declare type LtcUnspentTxsDTO = {
    network: string;
    address: string;
    txs: LtcAddressUTXO[];
};
export declare type LtcAddressUTXOs = LtcAddressUTXO[];
export declare type LtcBroadcastTransfer = {
    network: string;
    txid: string;
};

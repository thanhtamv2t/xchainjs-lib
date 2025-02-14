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
export declare type TxBroadcastParams = {
    sochainUrl: string;
    network: Network;
    txHex: string;
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
export declare type BtcAddressUTXO = {
    txid: string;
    output_no: number;
    script_asm: string;
    script_hex: string;
    value: string;
    confirmations: number;
    time: number;
};
export declare type BtcAddressTxDTO = {
    txid: string;
    block_no: number;
    confirmations: number;
    time: number;
    req_sigs: number;
    script_asm: string;
    script_hex: string;
};
export declare type BtcAddressDTO = {
    network: string;
    address: string;
    balance: string;
    received_value: string;
    pending_value: string;
    total_txs: number;
    txs: BtcAddressTxDTO[];
};
export declare type BtcGetBalanceDTO = {
    network: string;
    address: string;
    confirmed_balance: string;
    unconfirmed_balance: string;
};
export declare type BtcUnspentTxsDTO = {
    network: string;
    address: string;
    txs: BtcAddressUTXO[];
};
export declare type BtcAddressUTXOs = BtcAddressUTXO[];
export declare type BtcBroadcastTransfer = {
    network: string;
    txid: string;
};
export declare type TxConfirmedStatus = {
    network: string;
    txid: string;
    confirmations: number;
    is_confirmed: boolean;
};
export declare type ScanUTXOParam = {
    sochainUrl: string;
    network: Network;
    address: string;
    confirmedOnly?: boolean;
};

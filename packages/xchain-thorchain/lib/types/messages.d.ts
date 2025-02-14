import { Msg, AccAddress } from 'cosmos-client';
import { StdTxFee } from 'cosmos-client/api';
import { StdSignature } from 'cosmos-client/x/auth';
export declare type MsgCoin = {
    asset: string;
    amount: string;
};
export declare class MsgNativeTx extends Msg {
    coins: MsgCoin[];
    memo: string;
    signer: AccAddress;
    /**
     *
     * @param from_address
     * @param to_address
     * @param amount
     */
    constructor(coins: MsgCoin[], memo: string, signer: AccAddress);
}
/**
 * This creates MsgNativeTx from json.
 *
 * @param value
 * @returns {MsgNativeTx}
 */
export declare const msgNativeTxFromJson: (value: {
    coins: MsgCoin[];
    memo: string;
    signer: string;
}) => MsgNativeTx;
export declare type AminoWrapping<T> = {
    type: string;
    value: T;
};
export declare type ThorchainDepositResponse = AminoWrapping<{
    msg: AminoWrapping<{
        coins: MsgCoin[];
        memo: string;
        signer: string;
    }>[];
    fee: StdTxFee;
    signatures: StdSignature[];
    memo: string;
    timeout_height: string;
}>;
export declare type TxResult = {
    observed_tx: {
        tx: {
            id: string;
            chain: string;
            from_address: string;
            to_address: string;
            coins: {
                asset: string;
                amount: string;
            }[];
            gas: {
                asset: string;
                amount: string;
            }[];
            memo: string;
        };
        status: string;
        signers: string[];
    };
    keysign_metric: {
        tx_id: string;
        node_tss_times: null;
    };
};

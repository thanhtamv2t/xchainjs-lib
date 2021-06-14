/// <reference types="node" />
import * as Litecoin from 'bitcoinjs-lib';
import { Address, Balance, Fees, Network, TxHash, TxParams } from '@xchainjs/xchain-client';
import { BaseAmount } from '@xchainjs/xchain-util';
import { AddressParams } from './types/sochain-api-types';
import { FeeRate, FeesWithRates } from './types/client-types';
import { BroadcastTxParams, UTXOs } from './types/common';
export declare const LTC_DECIMAL = 8;
/**
 * Compile memo.
 *
 * @param {string} memo The memo to be compiled.
 * @returns {Buffer} The compiled memo.
 */
export declare const compileMemo: (memo: string) => Buffer;
/**
 * Get the transaction fee.
 *
 * @param {UTXOs} inputs The UTXOs.
 * @param {FeeRate} feeRate The fee rate.
 * @param {Buffer} data The compiled memo (Optional).
 * @returns {number} The fee amount.
 */
export declare function getFee(inputs: UTXOs, feeRate: FeeRate, data?: Buffer | null): number;
/**
 * Get the average value of an array.
 *
 * @param {Array<number>} array
 * @returns {number} The average value.
 */
export declare function arrayAverage(array: Array<number>): number;
/**
 * Check if give network is a testnet.
 *
 * @param {Network} network
 * @returns {boolean} `true` or `false`
 */
export declare const isTestnet: (network: Network) => boolean;
/**
 * Get Litecoin network to be used with bitcoinjs.
 *
 * @param {Network} network
 * @returns {Litecoin.Network} The LTC network.
 */
export declare const ltcNetwork: (network: Network) => Litecoin.Network;
/**
 * Get the balances of an address.
 *
 * @param {AddressParams} params
 * @returns {Array<Balance>} The balances of the given address.
 */
export declare const getBalance: (params: AddressParams) => Promise<Balance[]>;
/**
 * Validate the LTC address.
 *
 * @param {string} address
 * @param {Network} network
 * @returns {boolean} `true` or `false`.
 */
export declare const validateAddress: (address: Address, network: Network) => boolean;
/**
 * Scan UTXOs from sochain.
 *
 * @param {AddressParams} params
 * @returns {Array<UTXO>} The UTXOs of the given address.
 */
export declare const scanUTXOs: (params: AddressParams) => Promise<UTXOs>;
/**
 * Build transcation.
 *
 * @param {BuildParams} params The transaction build options.
 * @returns {Transaction}
 */
export declare const buildTx: ({ amount, recipient, memo, feeRate, sender, network, sochainUrl, }: TxParams & {
    feeRate: FeeRate;
    sender: Address;
    network: Network;
    sochainUrl: string;
}) => Promise<{
    psbt: Litecoin.Psbt;
    utxos: UTXOs;
}>;
/**
 * Broadcast the transaction.
 *
 * @param {BroadcastTxParams} params The transaction broadcast options.
 * @returns {TxHash} The transaction hash.
 */
export declare const broadcastTx: (params: BroadcastTxParams) => Promise<TxHash>;
/**
 * Calculate fees based on fee rate and memo.
 *
 * @param {FeeRate} feeRate
 * @param {string} memo
 * @returns {BaseAmount} The calculated fees based on fee rate and the memo.
 */
export declare const calcFee: (feeRate: FeeRate, memo?: string | undefined) => BaseAmount;
/**
 * Get the default fees with rates.
 *
 * @returns {FeesWithRates} The default fees and rates.
 */
export declare const getDefaultFeesWithRates: () => FeesWithRates;
/**
 * Get the default fees.
 *
 * @returns {Fees} The default fees.
 */
export declare const getDefaultFees: () => Fees;
/**
 * Get address prefix based on the network.
 *
 * @param {string} network
 * @returns {string} The address prefix based on the network.
 *
 **/
export declare const getPrefix: (network: Network) => "tltc1" | "ltc1";

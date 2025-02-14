import { BtcAddressUTXOs, BtcAddressDTO, Transaction, AddressParams, TxHashParams, TxConfirmedStatus } from './types/sochain-api-types';
import { BaseAmount } from '@xchainjs/xchain-util';
/**
 * Get address information.
 *
 * @see https://sochain.com/api#get-display-data-address
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {BtcAddressDTO}
 */
export declare const getAddress: ({ sochainUrl, network, address }: AddressParams) => Promise<BtcAddressDTO>;
/**
 * Get transaction by hash.
 *
 * @see https://sochain.com/api#get-tx
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network network id
 * @param {string} hash The transaction hash.
 * @returns {Transactions}
 */
export declare const getTx: ({ sochainUrl, network, hash }: TxHashParams) => Promise<Transaction>;
/**
 * Get address balance.
 *
 * @see https://sochain.com/api#get-balance
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {number}
 */
export declare const getBalance: ({ sochainUrl, network, address }: AddressParams) => Promise<BaseAmount>;
/**
 * Get unspent txs
 *
 * @see https://sochain.com/api#get-unspent-tx
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {BtcAddressUTXOs}
 */
export declare const getUnspentTxs: ({ sochainUrl, network, address, startingFromTxId, }: AddressParams) => Promise<BtcAddressUTXOs>;
/**
 * Get Tx Confirmation status
 *
 * @see https://sochain.com/api#get-is-tx-confirmed
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network mainnet | testnet
 * @param {string} hash tx id
 * @returns {TxConfirmedStatus}
 */
export declare const getIsTxConfirmed: ({ sochainUrl, network, hash }: TxHashParams) => Promise<TxConfirmedStatus>;
/**
 * Get unspent txs and filter out pending UTXOs
 *
 * @see https://sochain.com/api#get-unspent-tx
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {BtcAddressUTXOs}
 */
export declare const getConfirmedUnspentTxs: ({ sochainUrl, network, address, }: AddressParams) => Promise<BtcAddressUTXOs>;
/**
 * Get Bitcoin suggested transaction fee.
 *
 * @returns {number} The Bitcoin suggested transaction fee per bytes in sat.
 */
export declare const getSuggestedTxFee: () => Promise<number>;

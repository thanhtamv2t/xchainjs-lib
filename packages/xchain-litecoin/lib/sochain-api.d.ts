import { LtcAddressUTXOs, LtcAddressDTO, Transaction, AddressParams, TxHashParams } from './types/sochain-api-types';
import { BaseAmount } from '@xchainjs/xchain-util';
/**
 * Get address information.
 *
 * @see https://sochain.com/api#get-display-data-address
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {LtcAddressDTO}
 */
export declare const getAddress: ({ sochainUrl, network, address }: AddressParams) => Promise<LtcAddressDTO>;
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
 * @returns {LtcAddressUTXOs}
 */
export declare const getUnspentTxs: ({ sochainUrl, network, address, startingFromTxId, }: AddressParams) => Promise<LtcAddressUTXOs>;
/**
 * Get Litecoin suggested transaction fee.
 *
 * @returns {number} The Litecoin suggested transaction fee per bytes in sat.
 */
export declare const getSuggestedTxFee: () => Promise<number>;

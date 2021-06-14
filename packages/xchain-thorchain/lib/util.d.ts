import { Asset } from '@xchainjs/xchain-util';
import { ClientUrl, ExplorerUrls } from './types';
import { TxResponse } from '@xchainjs/xchain-cosmos';
import { Txs, Fees, Network, Address, TxHash } from '@xchainjs/xchain-client';
import { Msg } from 'cosmos-client';
import { MsgMultiSend, MsgSend } from 'cosmos-client/x/bank';
export declare const DECIMAL = 8;
export declare const DEFAULT_GAS_VALUE = "2000000";
export declare const MSG_SEND = "send";
export declare const MSG_DEPOSIT = "deposit";
export declare const MAX_TX_COUNT = 100;
/**
 * Get denomination from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination of the given asset.
 */
export declare const getDenom: (asset: Asset) => string;
/**
 * Get denomination with chainname from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination with chainname of the given asset.
 */
export declare const getDenomWithChain: (asset: Asset) => string;
/**
 * Get Asset from denomination
 *
 * @param {string} denom
 * @returns {Asset|null} The asset of the given denomination.
 */
export declare const getAsset: (denom: string) => Asset | null;
/**
 * Type guard for MsgSend
 *
 * @param {Msg} msg
 * @returns {boolean} `true` or `false`.
 */
export declare const isMsgSend: (msg: Msg) => msg is MsgSend;
/**
 * Type guard for MsgMultiSend
 *
 * @param {Msg} msg
 * @returns {boolean} `true` or `false`.
 */
export declare const isMsgMultiSend: (msg: Msg) => msg is MsgMultiSend;
/**
 * Response guard for transaction broadcast
 *
 * @param {any} response The response from the node.
 * @returns {boolean} `true` or `false`.
 */
export declare const isBroadcastSuccess: (response: any) => boolean;
/**
 * Get address prefix based on the network.
 *
 * @param {string} network
 * @returns {string} The address prefix based on the network.
 *
 **/
export declare const getPrefix: (network: string) => "tthor" | "thor";
/**
 * Register Codecs based on the network.
 *
 * @param {Network}
 */
export declare const registerCodecs: (network: Network) => void;
/**
 * Parse transaction type
 *
 * @param {Array<TxResponse>} txs The transaction response from the node.
 * @param {Asset} mainAsset Current main asset which depends on the network.
 * @returns {Txs} The parsed transaction result.
 */
export declare const getTxsFromHistory: (txs: Array<TxResponse>, network: Network) => Txs;
/**
 * Get the default fee.
 *
 * @returns {Fees} The default fee.
 */
export declare const getDefaultFees: () => Fees;
/**
 * Get transaction type.
 *
 * @param {string} txData the transaction input data
 * @param {string} encoding `base64` or `hex`
 * @returns {string} the transaction type.
 */
export declare const getTxType: (txData: string, encoding: 'base64' | 'hex') => string;
/**
 * Get the client url.
 *
 * @returns {ClientUrl} The client url (both mainnet and testnet) for thorchain.
 */
export declare const getDefaultClientUrl: () => ClientUrl;
/**
 * Get default explorer urls.
 *
 * @returns {ExplorerUrls} Default explorer urls (both mainnet and testnet) for thorchain.
 */
export declare const getDefaultExplorerUrls: () => ExplorerUrls;
/**
 * Get the explorer url.
 *
 * @param {Network} network
 * @param {ExplorerUrls} Explorer urls
 * @returns {string} The explorer url for thorchain based on the given network.
 */
export declare const getExplorerUrl: ({ root }: ExplorerUrls, network: Network) => string;
/**
 * Get explorer address url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {Address} address
 * @returns {string} The explorer url for the given address.
 */
export declare const getExplorerAddressUrl: ({ urls, network, address, }: {
    urls: ExplorerUrls;
    network: Network;
    address: Address;
}) => string;
/**
 * Get transaction url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {TxHash} txID
 * @returns {string} The explorer url for the given transaction id.
 */
export declare const getExplorerTxUrl: ({ urls, network, txID, }: {
    urls: ExplorerUrls;
    network: Network;
    txID: TxHash;
}) => string;

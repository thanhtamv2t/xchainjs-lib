import { Chain } from './types';
/**
 * Type guard to check whether string  is based on type `Chain`
 *
 * @param {string} c The chain string.
 * @returns {boolean} `true` or `false`
 */
export declare const isChain: (c: string) => c is "BNB" | "BTC" | "ETH" | "THOR" | "GAIA" | "POLKA" | "BCH" | "LTC";
/**
 * Convert chain to string.
 *
 * @param {Chain} chainId.
 * @returns {string} The string based on the given chain type.
 */
export declare const chainToString: (chainId: Chain) => "Thorchain" | "Bitcoin" | "Bitcoin Cash" | "Litecoin" | "Ethereum" | "Binance Chain" | "Cosmos" | "Polkadot" | "unknown chain";

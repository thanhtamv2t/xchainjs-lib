import { Balances, Fees, Network as XChainNetwork, Tx } from '@xchainjs/xchain-client';
import { Asset, BaseAmount } from '@xchainjs/xchain-util';
import { ethers, BigNumber, providers } from 'ethers';
import { Network as EthNetwork, Address, ETHTransactionInfo, TokenTransactionInfo, FeesWithGasPricesAndLimits, GasPrices, TransactionOperation, TransactionInfo, TokenBalance } from './types';
export declare const ETH_DECIMAL = 18;
export declare const ETHPLORER_FREEKEY = "freekey";
export declare const SIMPLE_GAS_COST: ethers.BigNumber;
export declare const BASE_TOKEN_GAS_COST: ethers.BigNumber;
export declare const DEFAULT_GAS_PRICE = 50;
export declare const ETHAddress = "0x0000000000000000000000000000000000000000";
export declare const MAX_APPROVAL: ethers.BigNumber;
/**
 * XChainNetwork -> EthNetwork
 *
 * @param {XChainNetwork} network
 * @returns {EthNetwork}
 */
export declare const xchainNetworkToEths: (network: XChainNetwork) => EthNetwork;
/**
 * EthNetwork -> XChainNetwork
 *
 * @param {EthNetwork} network
 * @returns {XChainNetwork}
 */
export declare const ethNetworkToXchains: (network: EthNetwork) => XChainNetwork;
/**
 * Validate the given address.
 *
 * @param {Address} address
 * @returns {boolean} `true` or `false`
 */
export declare const validateAddress: (address: Address) => boolean;
/**
 * Get token address from asset.
 *
 * @param {Asset} asset
 * @returns {string|null} The token address.
 */
export declare const getTokenAddress: (asset: Asset) => string | null;
/**
 * Check if the symbol is valid.
 *
 * @param {string|null|undefined} symbol
 * @returns {boolean} `true` or `false`.
 */
export declare const validateSymbol: (symbol?: string | null | undefined) => boolean;
/**
 * Get transactions from token tx
 *
 * @param {TokenTransactionInfo} tx
 * @returns {Tx|null} The parsed transaction.
 */
export declare const getTxFromTokenTransaction: (tx: TokenTransactionInfo) => Tx | null;
/**
 * Get transactions from ETH transaction
 *
 * @param {ETHTransactionInfo} tx
 * @returns {Tx} The parsed transaction.
 */
export declare const getTxFromEthTransaction: (tx: ETHTransactionInfo) => Tx;
/**
 * Get transactions from operation
 *
 * @param {TransactionOperation} operation
 * @returns {Tx|null} The parsed transaction.
 */
export declare const getTxFromEthplorerTokenOperation: (operation: TransactionOperation) => Tx | null;
/**
 * Get transactions from ETH transaction
 *
 * @param {TransactionInfo} txInfo
 * @returns {Tx} The parsed transaction.
 */
export declare const getTxFromEthplorerEthTransaction: (txInfo: TransactionInfo) => Tx;
/**
 * Calculate fees by multiplying .
 *
 * @returns {Fees} The default gas price.
 */
export declare const getFee: ({ gasPrice, gasLimit }: {
    gasPrice: BaseAmount;
    gasLimit: BigNumber;
}) => BaseAmount;
export declare const estimateDefaultFeesWithGasPricesAndLimits: (asset?: Asset | undefined) => FeesWithGasPricesAndLimits;
/**
 * Get the default fees.
 *
 * @returns {Fees} The default gas price.
 */
export declare const getDefaultFees: (asset?: Asset | undefined) => Fees;
/**
 * Get the default gas price.
 *
 * @returns {Fees} The default gas prices.
 */
export declare const getDefaultGasPrices: (asset?: Asset | undefined) => GasPrices;
/**
 * Get address prefix based on the network.
 *
 * @returns {string} The address prefix based on the network.
 *
 **/
export declare const getPrefix: () => string;
/**
 * Filter self txs
 *
 * @returns {T[]}
 *
 **/
export declare const filterSelfTxs: <T extends {
    from: string;
    to: string;
    hash: string;
}>(txs: T[]) => T[];
/**
 * Get Decimals
 *
 * @param {Asset} asset
 * @returns {Number} the decimal of a given asset
 *
 * @throws {"Invalid asset"} Thrown if the given asset is invalid
 * @throws {"Invalid provider"} Thrown if the given provider is invalid
 */
export declare const getDecimal: (asset: Asset, provider: providers.Provider) => Promise<number>;
/**
 * Get Token Balances
 *
 * @param {Array<TokenBalance>} tokenBalances
 * @returns {Array<Balance>} the parsed balances
 *
 */
export declare const getTokenBalances: (tokenBalances: TokenBalance[]) => Balances;

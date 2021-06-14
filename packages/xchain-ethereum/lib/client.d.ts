import { ethers, BigNumber, Wallet } from 'ethers';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { EtherscanProvider } from '@ethersproject/providers';
import { ExplorerUrl, GasPrices, FeesParams, FeesWithGasPricesAndLimits, InfuraCreds, ApproveParams } from './types';
import { Address, Network as XChainNetwork, Tx, TxsPage, XChainClient, XChainClientParams, TxParams, TxHash, Fees, TxHistoryParams, Balances, FeeOptionKey, FeesParams as XFeesParams } from '@xchainjs/xchain-client';
import { BaseAmount, Asset } from '@xchainjs/xchain-util';
/**
 * Interface for custom Ethereum client
 */
export interface EthereumClient {
    call<T>(walletIndex: number, asset: Address, abi: ethers.ContractInterface, func: string, params: Array<unknown>): Promise<T>;
    estimateCall(asset: Address, abi: ethers.ContractInterface, func: string, params: Array<any>): Promise<BigNumber>;
    estimateGasPrices(): Promise<GasPrices>;
    estimateGasLimit(params: FeesParams): Promise<BigNumber>;
    estimateFeesWithGasPricesAndLimits(params: FeesParams): Promise<FeesWithGasPricesAndLimits>;
    isApproved(spender: Address, sender: Address, amount: BaseAmount): Promise<boolean>;
    approve(params: ApproveParams & {
        feeOptionKey?: FeeOptionKey;
    }): Promise<TransactionResponse>;
}
export declare type EthereumClientParams = XChainClientParams & {
    ethplorerUrl?: string;
    ethplorerApiKey?: string;
    explorerUrl?: ExplorerUrl;
    etherscanApiKey?: string;
    infuraCreds?: InfuraCreds;
};
/**
 * Custom Ethereum client
 */
export default class Client implements XChainClient, EthereumClient {
    private network;
    private hdNode;
    private etherscanApiKey?;
    private explorerUrl;
    private infuraCreds;
    private ethplorerUrl;
    private ethplorerApiKey;
    private rootDerivationPaths;
    private providers;
    /**
     * Constructor
     * @param {EthereumClientParams} params
     */
    constructor({ network, ethplorerUrl, ethplorerApiKey, explorerUrl, phrase, rootDerivationPaths, etherscanApiKey, infuraCreds, }: EthereumClientParams);
    /**
     * Purge client.
     *
     * @returns {void}
     */
    purgeClient: () => void;
    /**
     * Set/Update the explorer url.
     *
     * @param {string} url The explorer url.
     * @returns {void}
     */
    setExplorerURL: (url: ExplorerUrl) => void;
    /**
     * Get the current network.
     *
     * @returns {Network} The current network. (`mainnet` or `testnet`)
     */
    getNetwork: () => XChainNetwork;
    /**
     * Get the current address.
     *
     * @returns {Address} The current address.
     *
     * @throws {"Phrase must be provided"}
     * Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    getAddress: (index?: number) => Address;
    /**
     * Get etherjs wallet interface.
     *
     * @returns {Wallet} The current etherjs wallet interface.
     *
     * @throws {"Phrase must be provided"}
     * Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    getWallet: (index?: number) => ethers.Wallet;
    setupProviders: () => void;
    /**
     * Get etherjs Provider interface.
     *
     * @returns {Provider} The current etherjs Provider interface.
     */
    getProvider: () => Provider;
    /**
     * Get etherjs EtherscanProvider interface.
     *
     * @returns {EtherscanProvider} The current etherjs EtherscanProvider interface.
     */
    getEtherscanProvider: () => EtherscanProvider;
    /**
     * Get the explorer url.
     *
     * @returns {string} The explorer url for ethereum based on the current network.
     */
    getExplorerUrl: () => string;
    /**
     * Get the explorer url.
     *
     * @returns {ExplorerUrl} The explorer url (both mainnet and testnet) for ethereum.
     */
    private getDefaultExplorerURL;
    /**
     * Get the explorer url.
     *
     * @param {Network} network
     * @returns {string} The explorer url for ethereum based on the network.
     */
    private getExplorerUrlByNetwork;
    /**
     * Get the explorer url for the given address.
     *
     * @param {Address} address
     * @returns {string} The explorer url for the given address.
     */
    getExplorerAddressUrl: (address: Address) => string;
    /**
     * Get the explorer url for the given transaction id.
     *
     * @param {string} txID
     * @returns {string} The explorer url for the given transaction id.
     */
    getExplorerTxUrl: (txID: string) => string;
    /**
     * Set/update the current network.
     *
     * @param {Network} network `mainnet` or `testnet`.
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork: (network: XChainNetwork) => void;
    /**
     * Get getFullDerivationPath
     *
     * @param {number} index the HD wallet index
     * @returns {string} The derivation path based on the network.
     */
    getFullDerivationPath(index: number): string;
    /**
     * Set/update a new phrase (Eg. If user wants to change wallet)
     *
     * @param {string} phrase A new phrase.
     * @returns {Address} The address from the given phrase
     *
     * @throws {"Invalid phrase"}
     * Thrown if the given phase is invalid.
     */
    setPhrase: (phrase: string, walletIndex?: number) => Address;
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress: (address: Address) => boolean;
    /**
     * Get the ETH balance of a given address.
     *
     * @param {Address} address By default, it will return the balance of the current wallet. (optional)
     * @returns {Array<Balances>} The all balance of the address.
     *
     * @throws {"Invalid asset"} throws when the give asset is an invalid one
     */
    getBalance: (address: Address, assets?: Asset[] | undefined) => Promise<Balances>;
    /**
     * Get transaction history of a given address with pagination options.
     * By default it will return the transaction history of the current wallet.
     *
     * @param {TxHistoryParams} params The options to get transaction history. (optional)
     * @returns {TxsPage} The transaction history.
     */
    getTransactions: (params?: TxHistoryParams | undefined) => Promise<TxsPage>;
    /**
     * Get the transaction details of a given transaction id.
     *
     * @param {string} txId The transaction id.
     * @param {string} assetAddress The asset address. (optional)
     * @returns {Tx} The transaction details of the given transaction id.
     *
     * @throws {"Need to provide valid txId"}
     * Thrown if the given txId is invalid.
     */
    getTransactionData: (txId: string, assetAddress?: string | undefined) => Promise<Tx>;
    /**
     * Call a contract function.
     * @template T The result interface.
     * @param {Address} address The contract address.
     * @param {ContractInterface} abi The contract ABI json.
     * @param {string} func The function to be called.
     * @param {Array<any>} params The parameters of the function.
     * @returns {T} The result of the contract function call.
     *
     * @throws {"address must be provided"}
     * Thrown if the given contract address is empty.
     */
    call: <T>(walletIndex: number | undefined, contractAddress: Address, abi: ethers.ContractInterface, func: string, params: Array<unknown>) => Promise<T>;
    /**
     * Call a contract function.
     * @param {Address} address The contract address.
     * @param {ContractInterface} abi The contract ABI json.
     * @param {string} func The function to be called.
     * @param {Array<any>} params The parameters of the function.
     * @returns {BigNumber} The result of the contract function call.
     *
     * @throws {"address must be provided"}
     * Thrown if the given contract address is empty.
     */
    estimateCall: (contractAddress: Address, abi: ethers.ContractInterface, func: string, params: Array<any>) => Promise<BigNumber>;
    /**
     * Check allowance.
     *
     * @param {Address} spender The spender address.
     * @param {Address} sender The sender address.
     * @param {BaseAmount} amount The amount of token.
     * @returns {boolean} `true` or `false`.
     */
    isApproved: (spender: Address, sender: Address, amount: BaseAmount) => Promise<boolean>;
    /**
     * Check allowance.
     *
     * @param {number} walletIndex which wallet to use to make the call
     * @param {Address} spender The spender index.
     * @param {Address} sender The sender address.
     * @param {feeOptionKey} FeeOptionKey Fee option (optional)
     * @param {BaseAmount} amount The amount of token. By default, it will be unlimited token allowance. (optional)
     * @returns {TransactionResponse} The transaction result.
     */
    approve: ({ walletIndex, spender, sender, feeOptionKey, amount, }: ApproveParams) => Promise<TransactionResponse>;
    /**
     * Estimate gas limit of approve.
     *
     * @param {Address} spender The spender address.
     * @param {Address} sender The sender address.
     * @param {BaseAmount} amount The amount of token. By default, it will be unlimited token allowance. (optional)
     * @returns {BigNumber} The estimated gas limit.
     */
    estimateApprove: ({ spender, sender, amount, }: Omit<ApproveParams, 'feeOptionKey' | 'walletIndex'>) => Promise<BigNumber>;
    /**
     * Transfer ETH.
     *
     * @param {TxParams} params The transfer options.
     * @param {feeOptionKey} FeeOptionKey Fee option (optional)
     * @param {gasPrice} BaseAmount Gas price (optional)
     * @param {gasLimit} BigNumber Gas limit (optional)
     *
     * A given `feeOptionKey` wins over `gasPrice` and `gasLimit`
     *
     * @returns {TxHash} The transaction hash.
     *
     * @throws {"Invalid asset address"}
     * Thrown if the given asset is invalid.
     */
    transfer: ({ walletIndex, asset, memo, amount, recipient, feeOptionKey, gasPrice, gasLimit, }: TxParams & {
        feeOptionKey?: FeeOptionKey | undefined;
        gasPrice?: BaseAmount | undefined;
        gasLimit?: ethers.BigNumber | undefined;
    }) => Promise<TxHash>;
    /**
     * Estimate gas price.
     * @see https://etherscan.io/apis#gastracker
     *
     * @returns {GasPrices} The gas prices (average, fast, fastest) in `Wei` (`BaseAmount`)
     *
     * @throws {"Failed to estimate gas price"} Thrown if failed to estimate gas price.
     */
    estimateGasPrices: () => Promise<GasPrices>;
    /**
     * Estimate gas.
     *
     * @param {FeesParams} params The transaction options.
     * @returns {BaseAmount} The estimated gas fee.
     *
     * @throws {"Failed to estimate gas limit"} Thrown if failed to estimate gas limit.
     */
    estimateGasLimit: ({ asset, recipient, amount, memo }: FeesParams) => Promise<BigNumber>;
    /**
     * Estimate gas prices/limits (average, fast fastest).
     *
     * @param {FeesParams} params
     * @returns {FeesWithGasPricesAndLimits} The estimated gas prices/limits.
     *
     * @throws {"Failed to estimate fees, gas price, gas limit"} Thrown if failed to estimate fees, gas price, gas limit.
     */
    estimateFeesWithGasPricesAndLimits: (params: FeesParams) => Promise<FeesWithGasPricesAndLimits>;
    /**
     * Get fees.
     *
     * @param {FeesParams} params
     * @returns {Fees} The average/fast/fastest fees.
     *
     * @throws {"Failed to get fees"} Thrown if failed to get fees.
     */
    getFees: (params: XFeesParams & FeesParams) => Promise<Fees>;
}
export { Client };

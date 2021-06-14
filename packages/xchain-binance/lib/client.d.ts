import { BncClient } from '@binance-chain/javascript-sdk/lib/client';
import { Address, XChainClient, XChainClientParams, Balances, Fees, Network, Tx, TxParams, TxHash, TxHistoryParams, TxsPage } from '@xchainjs/xchain-client';
import { Asset, BaseAmount } from '@xchainjs/xchain-util';
export declare type Coin = {
    asset: Asset;
    amount: BaseAmount;
};
export declare type MultiTransfer = {
    to: Address;
    coins: Coin[];
};
export declare type MultiSendParams = {
    walletIndex?: number;
    transactions: MultiTransfer[];
    memo?: string;
};
/**
 * Interface for custom Binance client
 */
export interface BinanceClient {
    purgeClient(): void;
    getBncClient(): BncClient;
    getMultiSendFees(): Promise<Fees>;
    getSingleAndMultiFees(): Promise<{
        single: Fees;
        multi: Fees;
    }>;
    multiSend(params: MultiSendParams): Promise<TxHash>;
}
/**
 * Custom Binance client
 */
declare class Client implements BinanceClient, XChainClient {
    private network;
    private bncClient;
    private phrase;
    /**
     * Constructor
     *
     * Client has to be initialised with network type and phrase.
     * It will throw an error if an invalid phrase has been passed.
     *
     * @param {XChainClientParams} params
     *
     * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
     */
    constructor({ network, phrase }: XChainClientParams);
    /**
     * Purge client.
     *
     * @returns {void}
     */
    purgeClient(): void;
    /**
     * Get the BncClient interface.
     *
     * @returns {BncClient} The BncClient from `@binance-chain/javascript-sdk`.
     */
    getBncClient(): BncClient;
    /**
     * Set/update the current network.
     *
     * @param {Network} network `mainnet` or `testnet`.
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork(network: Network): void;
    /**
     * Get the current network.
     *
     * @returns {Network} The current network. (`mainnet` or `testnet`)
     */
    getNetwork(): Network;
    /**
     * Get the client url.
     *
     * @returns {string} The client url for binance chain based on the network.
     */
    private getClientUrl;
    /**
     * Get the explorer url.
     *
     * @returns {string} The explorer url based on the network.
     */
    getExplorerUrl: () => string;
    /**
     * Get the explorer url for the given address.
     *
     * @param {Address} address
     * @returns {string} The explorer url for the given address based on the network.
     */
    getExplorerAddressUrl: (address: Address) => string;
    /**
     * Get the explorer url for the given transaction id.
     *
     * @param {string} txID
     * @returns {string} The explorer url for the given transaction id based on the network.
     */
    getExplorerTxUrl: (txID: string) => string;
    /**
     * Set/update a new phrase
     *
     * @param {string} phrase A new phrase.
     * @returns {Address} The address from the given phrase
     *
     * @throws {"Invalid phrase"}
     * Thrown if the given phase is invalid.
     */
    setPhrase: (phrase: string, walletIndex?: number) => Address;
    /**
     * @private
     * Get private key.
     *
     * @param {number} index account index for the derivation path
     * @returns {PrivKey} The privkey generated from the given phrase
     *
     * @throws {"Phrase not set"}
     * Throws an error if phrase has not been set before
     * */
    private getPrivateKey;
    /**
     * Get the current address.
     *
     * @returns {Address} The current address.
     *
     * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    getAddress: (index?: number) => string;
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress: (address: Address) => boolean;
    /**
     * Get the balance of a given address.
     *
     * @param {Address | number} address By default, it will return the balance of the current wallet. (optional)
     * @param {Asset} asset If not set, it will return all assets available. (optional)
     * @returns {Array<Balance>} The balance of the address.
     */
    getBalance: (address: Address, assets?: Asset[] | undefined) => Promise<Balances>;
    /**
     * @private
     * Search transactions with parameters.
     *
     * @returns {Params} The parameters to be used for transaction search.
     * */
    private searchTransactions;
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
     * @returns {Tx} The transaction details of the given transaction id.
     */
    getTransactionData: (txId: string) => Promise<Tx>;
    /**
     * Broadcast multi-send transaction.
     *
     * @param {MultiSendParams} params The multi-send transfer options.
     * @returns {TxHash} The transaction hash.
     */
    multiSend: ({ walletIndex, transactions, memo }: MultiSendParams) => Promise<TxHash>;
    /**
     * Transfer balances.
     *
     * @param {TxParams} params The transfer options.
     * @returns {TxHash} The transaction hash.
     */
    transfer: ({ walletIndex, asset, amount, recipient, memo }: TxParams) => Promise<TxHash>;
    /**
     * Get the current transfer fee.
     *
     * @returns {TransferFee} The current transfer fee.
     */
    private getTransferFee;
    /**
     * Get the current fee.
     *
     * @returns {Fees} The current fee.
     */
    getFees: () => Promise<Fees>;
    /**
     * Get the current fee for multi-send transaction.
     *
     * @returns {Fees} The current fee for multi-send transaction.
     */
    getMultiSendFees: () => Promise<Fees>;
    /**
     * Get the current fee for both single and multi-send transaction.
     *
     * @returns {SingleAndMultiFees} The current fee for both single and multi-send transaction.
     */
    getSingleAndMultiFees: () => Promise<{
        single: Fees;
        multi: Fees;
    }>;
}
export { Client };

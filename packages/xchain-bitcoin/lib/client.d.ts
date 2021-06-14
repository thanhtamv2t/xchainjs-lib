import { TxHistoryParams, TxsPage, Address, XChainClient, Tx, TxParams, TxHash, Balance, Network, Fees, XChainClientParams } from '@xchainjs/xchain-client';
import { FeesWithRates, FeeRate, FeeRates } from './types/client-types';
/**
 * BitcoinClient Interface
 */
interface BitcoinClient {
    getFeesWithRates(memo?: string): Promise<FeesWithRates>;
    getFeesWithMemo(memo: string): Promise<Fees>;
    getFeeRates(): Promise<FeeRates>;
}
export declare type BitcoinClientParams = XChainClientParams & {
    sochainUrl?: string;
    blockstreamUrl?: string;
};
/**
 * Custom Bitcoin client
 */
declare class Client implements BitcoinClient, XChainClient {
    private net;
    private phrase;
    private sochainUrl;
    private blockstreamUrl;
    private rootDerivationPaths;
    /**
     * Constructor
     * Client is initialised with network type
     *
     * @param {BitcoinClientParams} params
     */
    constructor({ network, sochainUrl, blockstreamUrl, rootDerivationPaths, phrase, }: BitcoinClientParams);
    /**
     * Set/Update the sochain url.
     *
     * @param {string} url The new sochain url.
     * @returns {void}
     */
    setSochainUrl: (url: string) => void;
    /**
     * Set/Update the blockstream url.
     *
     * @param {string} url The new blockstream url.
     * @returns {void}
     */
    setBlockstreamUrl: (url: string) => void;
    /**
     * Set/update a new phrase.
     *
     * @param {string} phrase A new phrase.
     * @returns {Address} The first address from the given phrase
     *
     * @throws {"Invalid phrase"}
     * Thrown if the given phase is invalid.
     */
    setPhrase: (phrase: string, walletIndex?: number) => Address;
    /**
     * Purge client.
     *
     * @returns {void}
     */
    purgeClient: () => void;
    /**
     * Set/update the current network.
     *
     * @param {Network} network `mainnet` or `testnet`.
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork: (net: Network) => void;
    /**
     * Get the current network.
     *
     * @returns {Network} The current network. (`mainnet` or `testnet`)
     */
    getNetwork: () => Network;
    /**
     * Get getFullDerivationPath
     *
     * @param {number} index the HD wallet index
     * @returns {string} The bitcoin derivation path based on the network.
     */
    getFullDerivationPath(index: number): string;
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
     * @param {string} txID The transaction id
     * @returns {string} The explorer url for the given transaction id based on the network.
     */
    getExplorerTxUrl: (txID: string) => string;
    /**
     * Get the current address.
     *
     * Generates a network-specific key-pair by first converting the buffer to a Wallet-Import-Format (WIF)
     * The address is then decoded into type P2WPKH and returned.
     *
     * @returns {Address} The current address.
     *
     * @throws {"Phrase must be provided"} Thrown if phrase has not been set before.
     * @throws {"Address not defined"} Thrown if failed creating account from phrase.
     */
    getAddress: (index?: number) => Address;
    /**
     * @private
     * Get private key.
     *
     * Private function to get keyPair from the this.phrase
     *
     * @param {string} phrase The phrase to be used for generating privkey
     * @returns {ECPairInterface} The privkey generated from the given phrase
     *
     * @throws {"Could not get private key from phrase"} Throws an error if failed creating BTC keys from the given phrase
     * */
    private getBtcKeys;
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress: (address: string) => boolean;
    /**
     * Get the BTC balance of a given address.
     *
     * @param {Address} the BTC address
     * @returns {Array<Balance>} The BTC balance of the address.
     */
    getBalance: (address: Address) => Promise<Balance[]>;
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
     * Get the rates and fees.
     *
     * @param {string} memo The memo to be used for fee calculation (optional)
     * @returns {FeesWithRates} The fees and rates
     */
    getFeesWithRates: (memo?: string | undefined) => Promise<FeesWithRates>;
    /**
     * Get the current fees.
     *
     * @returns {Fees} The fees without memo
     */
    getFees: () => Promise<Fees>;
    /**
     * Get the fees for transactions with memo.
     * If you want to get `Fees` and `FeeRates` at once, use `getFeesAndRates` method
     *
     * @param {string} memo
     * @returns {Fees} The fees with memo
     */
    getFeesWithMemo: (memo: string) => Promise<Fees>;
    /**
     * Get the fee rates for transactions without a memo.
     * If you want to get `Fees` and `FeeRates` at once, use `getFeesAndRates` method
     *
     * @returns {FeeRates} The fee rate
     */
    getFeeRates: () => Promise<FeeRates>;
    /**
     * Transfer BTC.
     *
     * @param {TxParams&FeeRate} params The transfer options.
     * @returns {TxHash} The transaction hash.
     */
    transfer: (params: TxParams & {
        feeRate?: FeeRate;
    }) => Promise<TxHash>;
}
export { Client, Network };

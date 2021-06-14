import { Address, Balance, Network, Fees, Tx, TxParams, TxHash, TxHistoryParams, TxsPage, XChainClient, XChainClientParams } from '@xchainjs/xchain-client';
import { FeesWithRates, FeeRate, FeeRates, ClientUrl } from './types/client-types';
import { NodeAuth } from './types';
/**
 * BitcoinCashClient Interface
 */
interface BitcoinCashClient {
    getFeesWithRates(memo?: string): Promise<FeesWithRates>;
    getFeesWithMemo(memo: string): Promise<Fees>;
    getFeeRates(): Promise<FeeRates>;
}
export declare type BitcoinCashClientParams = XChainClientParams & {
    haskoinUrl?: ClientUrl;
    nodeUrl?: ClientUrl;
    nodeAuth?: NodeAuth;
    rootPath?: string;
    index?: number;
};
/**
 * Custom Bitcoin Cash client
 */
declare class Client implements BitcoinCashClient, XChainClient {
    private network;
    private phrase;
    private haskoinUrl;
    private nodeUrl;
    private nodeAuth?;
    private rootDerivationPaths;
    /**
     * Constructor
     * Client is initialised with network type
     *
     * @param {BitcoinCashClientParams} params
     */
    constructor({ network, haskoinUrl, phrase, nodeUrl, nodeAuth, rootDerivationPaths, }: BitcoinCashClientParams);
    /**
     * Set/Update the haskoin url.
     *
     * @param {string} url The new haskoin url.
     * @returns {void}
     */
    setHaskoinURL: (url: ClientUrl) => void;
    /**
     * Get the haskoin url.
     *
     * @returns {string} The haskoin url based on the current network.
     */
    getHaskoinURL: () => string;
    /**
     * Set/Update the node url.
     *
     * @param {string} url The new node url.
     * @returns {void}
     */
    setNodeURL: (url: ClientUrl) => void;
    /**
     * Get the node url.
     *
     * @returns {string} The node url for thorchain based on the current network.
     */
    getNodeURL: () => string;
    /**
     * Set/update a new phrase.
     *
     * @param {string} phrase A new phrase.
     * @param {string} derivationPath bip44 derivation path
     * @returns {Address} The address from the given phrase
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
     * @private
     * Get private key.
     *
     * Private function to get keyPair from the this.phrase
     *
     * @param {string} phrase The phrase to be used for generating privkey
     * @param {string} derivationPath BIP44 derivation path
     * @returns {PrivateKey} The privkey generated from the given phrase
     *
     * @throws {"Invalid phrase"} Thrown if invalid phrase is provided.
     * */
    private getBCHKeys;
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
     * Get getFullDerivationPath
     *
     * @param {number} index the HD wallet index
     * @returns {string} The derivation path based on the network.
     */
    getFullDerivationPath(index: number): string;
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress: (address: string) => boolean;
    /**
     * Get the BCH balance of a given address.
     *
     * @param {Address} address By default, it will return the balance of the current wallet. (optional)
     * @returns {Array<Balance>} The BCH balance of the address.
     *
     * @throws {"Invalid address"} Thrown if the given address is an invalid address.
     */
    getBalance: (address: Address) => Promise<Balance[]>;
    /**
     * Get transaction history of a given address with pagination options.
     * By default it will return the transaction history of the current wallet.
     *
     * @param {TxHistoryParams} params The options to get transaction history. (optional)
     * @returns {TxsPage} The transaction history.
     *
     * @throws {"Invalid address"} Thrown if the given address is an invalid address.
     */
    getTransactions: ({ address, offset, limit }: TxHistoryParams) => Promise<TxsPage>;
    /**
     * Get the transaction details of a given transaction id.
     *
     * @param {string} txId The transaction id.
     * @returns {Tx} The transaction details of the given transaction id.
     *
     * @throws {"Invalid TxID"} Thrown if the given transaction id is an invalid one.
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
     * Transfer BCH.
     *
     * @param {TxParams&FeeRate} params The transfer options.
     * @returns {TxHash} The transaction hash.
     */
    transfer: (params: TxParams & {
        feeRate?: FeeRate;
    }) => Promise<TxHash>;
}
export { Client };

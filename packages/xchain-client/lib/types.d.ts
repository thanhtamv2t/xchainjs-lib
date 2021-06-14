import { Asset, BaseAmount } from '@xchainjs/xchain-util';
export declare type Address = string;
export declare type Network = 'testnet' | 'mainnet';
export declare type Balance = {
    asset: Asset;
    amount: BaseAmount;
};
export declare type Balances = Balance[];
export declare type TxType = 'transfer' | 'unknown';
export declare type TxHash = string;
export declare type TxTo = {
    to: Address;
    amount: BaseAmount;
};
export declare type TxFrom = {
    from: Address | TxHash;
    amount: BaseAmount;
};
export declare type Tx = {
    asset: Asset;
    from: TxFrom[];
    to: TxTo[];
    date: Date;
    type: TxType;
    hash: string;
};
export declare type Txs = Tx[];
export declare type TxsPage = {
    total: number;
    txs: Txs;
};
export declare type TxHistoryParams = {
    address: Address;
    offset?: number;
    limit?: number;
    startTime?: Date;
    asset?: string;
};
export declare type TxParams = {
    walletIndex?: number;
    asset?: Asset;
    amount: BaseAmount;
    recipient: Address;
    memo?: string;
};
export declare type FeesParams = {
    readonly empty?: '';
};
export declare type FeeOptionKey = 'average' | 'fast' | 'fastest';
export declare type FeeOption = Record<FeeOptionKey, BaseAmount>;
export declare type FeeType = 'byte' | 'base';
export declare type Fees = FeeOption & {
    type: FeeType;
};
export declare type RootDerivationPaths = {
    mainnet: string;
    testnet: string;
};
export declare type XChainClientParams = {
    network?: Network;
    phrase?: string;
    rootDerivationPaths?: RootDerivationPaths;
};
export interface XChainClient {
    setNetwork(net: Network): void;
    getNetwork(): Network;
    getExplorerUrl(): string;
    getExplorerAddressUrl(address: Address): string;
    getExplorerTxUrl(txID: string): string;
    validateAddress(address: string): boolean;
    getAddress(walletIndex?: number): Address;
    setPhrase(phrase: string, walletIndex: number): Address;
    getBalance(address: Address, assets?: Asset[]): Promise<Balances>;
    getTransactions(params?: TxHistoryParams): Promise<TxsPage>;
    getTransactionData(txId: string, assetAddress?: Address): Promise<Tx>;
    getFees(params?: FeesParams): Promise<Fees>;
    transfer(params: TxParams): Promise<TxHash>;
    purgeClient(): void;
}

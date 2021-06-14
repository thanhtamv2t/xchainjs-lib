import { Network } from '@xchainjs/xchain-client/lib';
import { Asset, BaseAmount } from '@xchainjs/xchain-util';
export declare type NodeUrl = {
    node: string;
    rpc: string;
};
export declare type ClientUrl = {
    testnet: NodeUrl;
    mainnet: NodeUrl;
};
export declare type ExplorerUrls = {
    root: ExplorerUrl;
    tx: ExplorerUrl;
    address: ExplorerUrl;
};
export declare type ExplorerUrl = Record<Network, string>;
export declare type ThorchainClientParams = {
    clientUrl?: ClientUrl;
    explorerUrls?: ExplorerUrls;
};
export declare type DepositParam = {
    walletIndex?: number;
    asset?: Asset;
    amount: BaseAmount;
    memo: string;
};
export declare const THORChain = "THOR";
export declare const AssetRune: Asset;

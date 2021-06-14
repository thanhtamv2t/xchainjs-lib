import BigNumber from 'bignumber.js';
import { chains } from '../chain.const';
export declare enum Denomination {
    /**
     * values for asset amounts in base units (no decimal)
     */
    BASE = "BASE",
    /**
     * values of asset amounts (w/ decimal)
     */
    ASSET = "ASSET"
}
declare type Amount<T> = {
    type: T;
    amount: () => BigNumber;
    plus: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    minus: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    times: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    div: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    gt: (value: BigNumber.Value | Amount<T>) => boolean;
    gte: (value: BigNumber.Value | Amount<T>) => boolean;
    lt: (value: BigNumber.Value | Amount<T>) => boolean;
    lte: (value: BigNumber.Value | Amount<T>) => boolean;
    eq: (value: BigNumber.Value | Amount<T>) => boolean;
    decimal: number;
};
export declare type BaseAmount = Amount<Denomination.BASE>;
export declare type AssetAmount = Amount<Denomination.ASSET>;
export declare type Amounts = AssetAmount | BaseAmount;
export declare type Chain = typeof chains[number];
export declare type Asset = {
    chain: Chain;
    symbol: string;
    ticker: string;
};
export {};

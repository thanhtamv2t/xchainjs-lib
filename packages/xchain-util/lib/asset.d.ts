import BigNumber from 'bignumber.js';
import { AssetAmount, BaseAmount, Amounts, Asset } from './types';
/**
 * Guard to check whether value is a BigNumber.Value or not
 *
 * @param {unknown} v
 * @returns {boolean} `true` or `false`.
 * */
export declare const isBigNumberValue: (v: unknown) => v is BigNumber.Value;
/**
 * Factory to create values of assets (e.g. RUNE)
 *
 * @param {string|number|BigNumber|undefined} value - The asset amount, If the value is undefined, AssetAmount with value `0` will be returned.
 * @param {number} decimal The decimal places. (optional)
 * @returns {AssetAmount} The asset amount from the given value and decimal.
 *
 **/
export declare const assetAmount: (value: BigNumber.Value | undefined, decimal?: number) => AssetAmount;
/**
 * Factory to create base amounts (e.g. tor)
 *
 * @param {string|number|BigNumber|undefined} value - The base amount, If the value is undefined, BaseAmount with value `0` will be returned.
 * @param {number} decimal The decimal places of its associated AssetAmount. (optional)
 * @returns {BaseAmount} The base amount from the given value and decimal.
 **/
export declare const baseAmount: (value: BigNumber.Value | undefined, decimal?: number) => BaseAmount;
/**
 * Helper to convert values for a asset from base values (e.g. RUNE from tor)
 *
 * @param {BaseAmount} base
 * @returns {AssetAmount} The asset amount from the given base amount.
 * */
export declare const baseToAsset: (base: BaseAmount) => AssetAmount;
/**
 * Helper to convert asset to base values (e.g. tor -> RUNE)
 *
 * @param {AssetAmount} asset
 * @returns {BaseAmount} The base amount from the given AssetAmount.
 * */
export declare const assetToBase: (asset: AssetAmount) => BaseAmount;
/**
 * Guard to check whether value is an amount of asset or not
 *
 * @param {BaseAmount|AssetAmount} v
 * @returns {boolean} `true` or `false`.
 * */
export declare const isAssetAmount: (v: Amounts) => v is AssetAmount;
/**
 * Guard to check whether value is an amount of a base value or not
 *
 * @param {BaseAmount|AssetAmount} v
 * @returns {boolean} `true` or `false`.
 * */
export declare const isBaseAmount: (v: Amounts) => v is BaseAmount;
/**
 * Formats an `AssetAmount` into `string` based on decimal places
 *
 * If `decimal` is not set, `amount.decimal` is used
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} param The asset amount format options.
 * @returns {string} The formatted asset amount string from the given options.
 */
export declare const formatAssetAmount: ({ amount, decimal, trimZeros, }: {
    amount: AssetAmount;
    decimal?: number | undefined;
    trimZeros?: boolean | undefined;
}) => string;
/**
 * Formats a `BaseAmount` value into a `string`
 *
 * @param {BaseAmount} amount
 * @returns {string} The formatted base amount string from the given base amount.
 */
export declare const formatBaseAmount: (amount: BaseAmount) => string;
/**
 * Base "chain" asset of Binance chain.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetBNB: Asset;
/**
 * Base "chain" asset on bitcoin main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetBTC: Asset;
/**
 * Base "chain" asset on bitcoin cash main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetBCH: Asset;
/**
 * Base "chain" asset on litecoin main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetLTC: Asset;
/**
 * Base "chain" asset on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetETH: Asset;
export declare const RUNE_TICKER = "RUNE";
/**
 * Base "chain" asset for RUNE-67C on Binance test net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetRune67C: Asset;
/**
 * Base "chain" asset for RUNE-B1A on Binance main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetRuneB1A: Asset;
/**
 * Base "chain" asset on thorchain main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetRuneNative: Asset;
/**
 * Base "chain" asset for RUNE on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetRuneERC20: Asset;
/**
 * Base "chain" asset for RUNE on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
export declare const AssetRuneERC20Testnet: Asset;
/**
 * Helper to check whether asset is valid
 *
 * @param {Asset} asset
 * @returns {boolean} `true` or `false`
 */
export declare const isValidAsset: (asset: Asset) => boolean;
/**
 * Creates an `Asset` by a given string
 *
 * This helper function expects a string with following naming convention:
 * `AAA.BBB-CCC`
 * where
 * chain: `AAA`
 * ticker (optional): `BBB`
 * symbol: `BBB-CCC` or `CCC` (if no ticker available)
 *
 * @see  https://docs.thorchain.org/developers/transaction-memos#asset-notation
 *
 * If the naming convention fails, it returns null
 *
 * @param {string} s The given string.
 * @returns {Asset|null} The asset from the given string.
 */
export declare const assetFromString: (s: string) => Asset | null;
/**
 * Returns an `Asset` as a string using following naming convention:
 *
 * `AAA.BBB-CCC`
 * where
 * chain: `AAA`
 * ticker (optional): `BBB`
 * symbol: `BBB-CCC` or `CCC` (if no ticker available)
 *
 * @see https://docs.thorchain.org/developers/transaction-memos#asset-notation
 *
 * @param {Asset} asset The given asset.
 * @returns {string} The string from the given asset.
 */
export declare const assetToString: ({ chain, symbol }: Asset) => string;
/**
 * Currency symbols currently supported
 */
export declare enum AssetCurrencySymbol {
    RUNE = "\u16B1",
    BTC = "\u20BF",
    SATOSHI = "\u26A1",
    ETH = "\u039E",
    USD = "$"
}
/**
 * Returns currency symbols by given `Asset`
 *
 * @param {Asset} asset The given asset.
 * @returns {string} The currency symbol from the given asset.
 */
export declare const currencySymbolByAsset: ({ ticker }: Asset) => string;
/**
 * Formats an asset amount using its currency symbol
 *
 * If `decimal` is not set, `amount.decimal` is used
 * If `asset` is not set, `$` will be used as currency symbol by default
 * `trimZeros` is `false` by default
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} params The asset amount currency format options.
 * @return {string} The formatted asset amount string using its currency format.
 */
export declare const formatAssetAmountCurrency: ({ amount, asset, decimal, trimZeros: shouldTrimZeros, }: {
    amount: AssetAmount;
    asset?: Asset | undefined;
    decimal?: number | undefined;
    trimZeros?: boolean | undefined;
}) => string;
/**
 * Formats a `BaseAmount` into a string of an `AssetAmount`
 *
 * If `decimal` is not set, `amount.decimal` is used
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} params The base amount currency format options.
 * @return {string} The formatted base amount string using its currency format.
 */
export declare const formatBaseAsAssetAmount: ({ amount, decimal, trimZeros, }: {
    amount: BaseAmount;
    decimal?: number | undefined;
    trimZeros?: boolean | undefined;
}) => string;

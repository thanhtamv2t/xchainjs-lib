import BigNumber from 'bignumber.js';

/**
 * Helper to delay anything within an `async` function
 *
 * @param ms delay in milliseconds
 *
 * @example
 *
 * ```
 * const anyAsyncFunc = async () => {
 *  // do something
 *  console.log('before delay')
 *  // wait for 200ms
 *  await delay(200)
 *  // and do other things
 *  console.log('after delay')
 * }
 * ```
 */
var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };

/**
 * Shortcut to create a BigNumber
 *
 * @param {string | number | BigNumber.Instance} value
 * @returns {BigNumber} The BigNumber interface from the given value.
 */
var bn = function (value) { return new BigNumber(value); };
/**
 * Helper to check whether a BigNumber is valid or not
 *
 * @param {BigNumber} value
 * @returns {boolean} `true` or `false`.
 * */
var isValidBN = function (value) { return !value.isNaN(); };
/**
 * Helper to create a big number from string or number
 * If it fails to create a big number, a big number with value 0 will be returned instead
 *
 * @param {string|number|undefined} value
 * @returns {BigNumber} The BigNumber interface from the given value. If invalid one is provided, will return `0`.
 * */
var bnOrZero = function (value) {
    var b = value ? bn(value) : bn(0);
    return isValidBN(b) ? b : bn(0);
};
/**
 * Helper to validate a possible BigNumber
 * If the given valie is invalid or undefined, 0 is returned as a BigNumber
 *
 * @param {BigNumber|undefined} value
 * @returns {boolean} `true` or `false`.
 */
var validBNOrZero = function (value) { return (value && isValidBN(value) ? value : bn(0)); };
/**
 * Format a BaseNumber to a string depending on given decimal places
 *
 * @param {BigNumber} value
 * @param {number} decimal The decimal place. (optional)
 * @returns {string} The formatted string from the given BigNumber and decimal place.
 * */
var formatBN = function (value, decimal) {
    if (decimal === void 0) { decimal = 2; }
    return value.toFormat(decimal);
};
/**
 * The enumuration for symbol position.
 * `before` or `after`
 */
var SymbolPosition;
(function (SymbolPosition) {
    SymbolPosition["BEFORE"] = "before";
    SymbolPosition["AFTER"] = "after";
})(SymbolPosition || (SymbolPosition = {}));
/**
 * Formats a big number value by prefixing it with `$`
 *
 * @param {BigNumber} n
 * @param {number} decimalPlaces The decimal place. (optional)
 * @param {string} symbol The currency symbol. (optional)
 * @param {position} position The symbol position. (optional)
 * @returns {string} The formatted string from the given BigNumber, decimal places, symbol and position.
 */
var formatBNCurrency = function (n, decimalPlaces, symbol, position) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    if (symbol === void 0) { symbol = '$'; }
    if (position === void 0) { position = SymbolPosition.BEFORE; }
    var value = formatBN(n, decimalPlaces);
    if (position === SymbolPosition.BEFORE) {
        return "" + symbol + value;
    }
    return "" + value + symbol;
};
/**
 * Helper to get a fixed `BigNumber`
 * Returns zero `BigNumber` if `value` is invalid
 *
 * @param {number|string|BigNumber|undefined} value
 * @param {number} decimalPlaces The decimal place. (optional)
 * @returns {BigNumber} The BigNumber interface from the given value and decimal.
 * */
var fixedBN = function (value, decimalPlaces) {
    if (decimalPlaces === void 0) { decimalPlaces = 2; }
    var n = bn(value || 0);
    var fixedBN = isValidBN(n) ? n.toFixed(decimalPlaces) : bn(0).toFixed(decimalPlaces);
    return bn(fixedBN);
};

/**
 * Removes leading / trailing zeros from a string of numbers
 * (1) Regex to remove trailing zeros https://stackoverflow.com/a/53397618/2032698
 * (2) Regex to remove leading zeros https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch06s06.html
 *
 * @param {string} value
 * @returns {string} The result after removing trailing zeros.
 */
var trimZeros = function (value) {
    return value
        // (1) remove trailing zeros
        .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')
        // (2) remove leading zeros
        .replace(/\b0*([1-9][0-9]*|0)\b/, '$1');
};

/**
 * Binance Chain
 */
var BNBChain = 'BNB';
/**
 * Bitcoin Chain
 */
var BTCChain = 'BTC';
/**
 * Ethereum Chain
 */
var ETHChain = 'ETH';
/**
 * Thorchain
 */
var THORChain = 'THOR';
/**
 * Cosmos Chain
 */
var CosmosChain = 'GAIA';
/**
 * Polkadot Chain
 */
var PolkadotChain = 'POLKA';
/**
 * Bitcoin Cash
 */
var BCHChain = 'BCH';
/**
 * Litecoin Chain
 */
var LTCChain = 'LTC';
/**
 * All possible chains XChainJS currently supports
 * */
var chains = [BNBChain, BTCChain, ETHChain, THORChain, CosmosChain, PolkadotChain, BCHChain, LTCChain];

/**
 * Type guard to check whether string  is based on type `Chain`
 *
 * @param {string} c The chain string.
 * @returns {boolean} `true` or `false`
 */
var isChain = function (c) { return chains.includes(c); };
/**
 * Convert chain to string.
 *
 * @param {Chain} chainId.
 * @returns {string} The string based on the given chain type.
 */
var chainToString = function (chainId) {
    switch (chainId) {
        case 'THOR':
            return 'Thorchain';
        case 'BTC':
            return 'Bitcoin';
        case 'BCH':
            return 'Bitcoin Cash';
        case 'LTC':
            return 'Litecoin';
        case 'ETH':
            return 'Ethereum';
        case 'BNB':
            return 'Binance Chain';
        case 'GAIA':
            return 'Cosmos';
        case 'POLKA':
            return 'Polkadot';
        default:
            return 'unknown chain';
    }
};

var Denomination;
(function (Denomination) {
    /**
     * values for asset amounts in base units (no decimal)
     */
    Denomination["BASE"] = "BASE";
    /**
     * values of asset amounts (w/ decimal)
     */
    Denomination["ASSET"] = "ASSET";
})(Denomination || (Denomination = {}));

/**
 * Guard to check whether value is a BigNumber.Value or not
 *
 * @param {unknown} v
 * @returns {boolean} `true` or `false`.
 * */
var isBigNumberValue = function (v) {
    return typeof v === 'string' || typeof v === 'number' || v instanceof BigNumber;
};
/**
 * Default number of asset decimals
 * For history reason and by starting the project on Binance chain assets, it's 8 decimal.
 *
 * For example:
 * ```
 * RUNE has a maximum of 8 digits of decimal
 * 0.00000001 RUNE == 1 ð (tor)
 * ```
 * */
var ASSET_DECIMAL = 8;
/**
 * Factory to create values of assets (e.g. RUNE)
 *
 * @param {string|number|BigNumber|undefined} value - The asset amount, If the value is undefined, AssetAmount with value `0` will be returned.
 * @param {number} decimal The decimal places. (optional)
 * @returns {AssetAmount} The asset amount from the given value and decimal.
 *
 **/
var assetAmount = function (value, decimal) {
    if (decimal === void 0) { decimal = ASSET_DECIMAL; }
    var amount = fixedBN(value, decimal);
    return {
        type: Denomination.ASSET,
        amount: function () { return amount; },
        plus: function (v, d) {
            if (d === void 0) { d = decimal; }
            return assetAmount(amount.plus(isBigNumberValue(v) ? v : v.amount()), d);
        },
        minus: function (v, d) {
            if (d === void 0) { d = decimal; }
            return assetAmount(amount.minus(isBigNumberValue(v) ? v : v.amount()), d);
        },
        times: function (v, d) {
            if (d === void 0) { d = decimal; }
            return assetAmount(amount.times(isBigNumberValue(v) ? v : v.amount()), d);
        },
        div: function (v, d) {
            if (d === void 0) { d = decimal; }
            return assetAmount(amount.div(isBigNumberValue(v) ? v : v.amount()), d);
        },
        lt: function (v) { return amount.lt(isBigNumberValue(v) ? v : v.amount()); },
        lte: function (v) { return amount.lte(isBigNumberValue(v) ? v : v.amount()); },
        gt: function (v) { return amount.gt(isBigNumberValue(v) ? v : v.amount()); },
        gte: function (v) { return amount.gte(isBigNumberValue(v) ? v : v.amount()); },
        eq: function (v) { return amount.eq(isBigNumberValue(v) ? v : v.amount()); },
        decimal: decimal,
    };
};
/**
 * Factory to create base amounts (e.g. tor)
 *
 * @param {string|number|BigNumber|undefined} value - The base amount, If the value is undefined, BaseAmount with value `0` will be returned.
 * @param {number} decimal The decimal places of its associated AssetAmount. (optional)
 * @returns {BaseAmount} The base amount from the given value and decimal.
 **/
var baseAmount = function (value, decimal) {
    if (decimal === void 0) { decimal = ASSET_DECIMAL; }
    var amount = fixedBN(value, 0);
    return {
        type: Denomination.BASE,
        amount: function () { return amount; },
        plus: function (v, d) {
            if (d === void 0) { d = decimal; }
            return baseAmount(amount.plus(isBigNumberValue(v) ? v : v.amount()), d);
        },
        minus: function (v, d) {
            if (d === void 0) { d = decimal; }
            return baseAmount(amount.minus(isBigNumberValue(v) ? v : v.amount()), d);
        },
        times: function (v, d) {
            if (d === void 0) { d = decimal; }
            return baseAmount(amount.times(isBigNumberValue(v) ? v : v.amount()), d);
        },
        div: function (v, d) {
            if (d === void 0) { d = decimal; }
            return baseAmount(amount.div(isBigNumberValue(v) ? v : v.amount()).decimalPlaces(0, BigNumber.ROUND_DOWN), d);
        },
        lt: function (v) { return amount.lt(isBigNumberValue(v) ? v : v.amount()); },
        lte: function (v) { return amount.lte(isBigNumberValue(v) ? v : v.amount()); },
        gt: function (v) { return amount.gt(isBigNumberValue(v) ? v : v.amount()); },
        gte: function (v) { return amount.gte(isBigNumberValue(v) ? v : v.amount()); },
        eq: function (v) { return amount.eq(isBigNumberValue(v) ? v : v.amount()); },
        decimal: decimal,
    };
};
/**
 * Helper to convert values for a asset from base values (e.g. RUNE from tor)
 *
 * @param {BaseAmount} base
 * @returns {AssetAmount} The asset amount from the given base amount.
 * */
var baseToAsset = function (base) {
    var decimal = base.decimal;
    var value = base
        .amount()
        .div(Math.pow(10, decimal))
        .decimalPlaces(decimal);
    return assetAmount(value, decimal);
};
/**
 * Helper to convert asset to base values (e.g. tor -> RUNE)
 *
 * @param {AssetAmount} asset
 * @returns {BaseAmount} The base amount from the given AssetAmount.
 * */
var assetToBase = function (asset) {
    var value = asset
        .amount()
        .multipliedBy(Math.pow(10, asset.decimal))
        .integerValue();
    return baseAmount(value, asset.decimal);
};
/**
 * Guard to check whether value is an amount of asset or not
 *
 * @param {BaseAmount|AssetAmount} v
 * @returns {boolean} `true` or `false`.
 * */
var isAssetAmount = function (v) { return v.type === Denomination.ASSET; };
/**
 * Guard to check whether value is an amount of a base value or not
 *
 * @param {BaseAmount|AssetAmount} v
 * @returns {boolean} `true` or `false`.
 * */
var isBaseAmount = function (v) { return v.type === Denomination.BASE; };
/**
 * Formats an `AssetAmount` into `string` based on decimal places
 *
 * If `decimal` is not set, `amount.decimal` is used
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} param The asset amount format options.
 * @returns {string} The formatted asset amount string from the given options.
 */
var formatAssetAmount = function (_a) {
    var amount = _a.amount, decimal = _a.decimal, _b = _a.trimZeros, trimZeros$1 = _b === void 0 ? false : _b;
    // strict check for `undefined` value as negate of 0 will return true and passed decimal value will be ignored
    var formatted = formatBN(amount.amount(), decimal === undefined ? amount.decimal : decimal);
    // Note: `trimZeros` wins over `decimal`
    return trimZeros$1 ? trimZeros(formatted) : formatted;
};
/**
 * Formats a `BaseAmount` value into a `string`
 *
 * @param {BaseAmount} amount
 * @returns {string} The formatted base amount string from the given base amount.
 */
var formatBaseAmount = function (amount) { return formatBN(amount.amount(), 0); };
/**
 * Base "chain" asset of Binance chain.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetBNB = { chain: BNBChain, symbol: 'BNB', ticker: 'BNB' };
/**
 * Base "chain" asset on bitcoin main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetBTC = { chain: BTCChain, symbol: 'BTC', ticker: 'BTC' };
/**
 * Base "chain" asset on bitcoin cash main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetBCH = { chain: BCHChain, symbol: 'BCH', ticker: 'BCH' };
/**
 * Base "chain" asset on litecoin main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetLTC = { chain: LTCChain, symbol: 'LTC', ticker: 'LTC' };
/**
 * Base "chain" asset on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetETH = { chain: ETHChain, symbol: 'ETH', ticker: 'ETH' };
var RUNE_TICKER = 'RUNE';
/**
 * Base "chain" asset for RUNE-67C on Binance test net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetRune67C = { chain: BNBChain, symbol: 'RUNE-67C', ticker: RUNE_TICKER };
/**
 * Base "chain" asset for RUNE-B1A on Binance main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetRuneB1A = { chain: BNBChain, symbol: 'RUNE-B1A', ticker: RUNE_TICKER };
/**
 * Base "chain" asset on thorchain main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetRuneNative = { chain: THORChain, symbol: RUNE_TICKER, ticker: RUNE_TICKER };
/**
 * Base "chain" asset for RUNE on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetRuneERC20 = {
    chain: ETHChain,
    symbol: RUNE_TICKER + "-0x3155ba85d5f96b2d030a4966af206230e46849cb",
    ticker: RUNE_TICKER,
};
/**
 * Base "chain" asset for RUNE on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
var AssetRuneERC20Testnet = {
    chain: ETHChain,
    symbol: RUNE_TICKER + "-0xd601c6A3a36721320573885A8d8420746dA3d7A0",
    ticker: RUNE_TICKER,
};
/**
 * Helper to check whether asset is valid
 *
 * @param {Asset} asset
 * @returns {boolean} `true` or `false`
 */
var isValidAsset = function (asset) { return !!asset.chain && !!asset.ticker && !!asset.symbol; };
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
var assetFromString = function (s) {
    var _a;
    var data = s.split('.');
    if (data.length <= 1 || ((_a = data[1]) === null || _a === void 0 ? void 0 : _a.length) < 1) {
        return null;
    }
    var chain = data[0];
    // filter out not supported string of chains
    if (!chain || !isChain(chain))
        return null;
    var symbol = data[1];
    var ticker = symbol.split('-')[0];
    return { chain: chain, symbol: symbol, ticker: ticker };
};
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
var assetToString = function (_a) {
    var chain = _a.chain, symbol = _a.symbol;
    return chain + "." + symbol;
};
/**
 * Currency symbols currently supported
 */
var AssetCurrencySymbol;
(function (AssetCurrencySymbol) {
    AssetCurrencySymbol["RUNE"] = "\u16B1";
    AssetCurrencySymbol["BTC"] = "\u20BF";
    AssetCurrencySymbol["SATOSHI"] = "\u26A1";
    AssetCurrencySymbol["ETH"] = "\u039E";
    AssetCurrencySymbol["USD"] = "$";
})(AssetCurrencySymbol || (AssetCurrencySymbol = {}));
/**
 * Returns currency symbols by given `Asset`
 *
 * @param {Asset} asset The given asset.
 * @returns {string} The currency symbol from the given asset.
 */
var currencySymbolByAsset = function (_a) {
    var ticker = _a.ticker;
    switch (true) {
        case ticker === RUNE_TICKER:
            return AssetCurrencySymbol.RUNE;
        case ticker === AssetBTC.ticker:
            return AssetCurrencySymbol.BTC;
        case ticker === AssetETH.ticker:
            return AssetCurrencySymbol.ETH;
        case ticker.includes('USD'):
            return AssetCurrencySymbol.USD;
        default:
            return ticker;
    }
};
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
var formatAssetAmountCurrency = function (_a) {
    var _b;
    var amount = _a.amount, asset = _a.asset, decimal = _a.decimal, _c = _a.trimZeros, shouldTrimZeros = _c === void 0 ? false : _c;
    var amountFormatted = formatAssetAmount({
        amount: amount,
        // strict check for `undefined` value as negate of 0 will return true and passed decimal value will be ignored
        decimal: decimal === undefined ? amount.decimal : decimal,
        trimZeros: shouldTrimZeros,
    });
    var ticker = (_b = asset === null || asset === void 0 ? void 0 : asset.ticker) !== null && _b !== void 0 ? _b : '';
    if (ticker) {
        // RUNE
        var regex = new RegExp(AssetRune67C.ticker + "|" + AssetRuneB1A.ticker + "|" + AssetRuneNative.ticker, 'i');
        if (ticker.match(regex))
            return AssetCurrencySymbol.RUNE + " " + amountFormatted;
        // BTC
        regex = new RegExp(AssetBTC.ticker, 'i');
        if (ticker.match(new RegExp(AssetBTC.ticker, 'i'))) {
            var base = assetToBase(amount);
            // format all < ₿ 0.01 in statoshi
            if (base.amount().isLessThanOrEqualTo('1000000')) {
                return AssetCurrencySymbol.SATOSHI + " " + formatBaseAmount(base);
            }
            return AssetCurrencySymbol.BTC + " " + amountFormatted;
        }
        // ETH
        regex = new RegExp(AssetETH.ticker, 'i');
        if (ticker.match(regex))
            return AssetCurrencySymbol.ETH + " " + amountFormatted;
        // USD
        regex = new RegExp('USD', 'i');
        if (ticker.match('USD'))
            return AssetCurrencySymbol.USD + " " + amountFormatted;
        return amountFormatted + " " + ticker;
    }
    return "$ " + amountFormatted;
};
/**
 * Formats a `BaseAmount` into a string of an `AssetAmount`
 *
 * If `decimal` is not set, `amount.decimal` is used
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} params The base amount currency format options.
 * @return {string} The formatted base amount string using its currency format.
 */
var formatBaseAsAssetAmount = function (_a) {
    var amount = _a.amount, decimal = _a.decimal, _b = _a.trimZeros, trimZeros = _b === void 0 ? false : _b;
    return formatAssetAmount({ amount: baseToAsset(amount), decimal: decimal, trimZeros: trimZeros });
};

export { AssetBCH, AssetBNB, AssetBTC, AssetCurrencySymbol, AssetETH, AssetLTC, AssetRune67C, AssetRuneB1A, AssetRuneERC20, AssetRuneERC20Testnet, AssetRuneNative, BCHChain, BNBChain, BTCChain, CosmosChain, Denomination, ETHChain, LTCChain, PolkadotChain, RUNE_TICKER, THORChain, assetAmount, assetFromString, assetToBase, assetToString, baseAmount, baseToAsset, bn, bnOrZero, chainToString, chains, currencySymbolByAsset, delay, fixedBN, formatAssetAmount, formatAssetAmountCurrency, formatBN, formatBNCurrency, formatBaseAmount, formatBaseAsAssetAmount, isAssetAmount, isBaseAmount, isBigNumberValue, isChain, isValidAsset, isValidBN, trimZeros, validBNOrZero };
//# sourceMappingURL=index.esm.js.map

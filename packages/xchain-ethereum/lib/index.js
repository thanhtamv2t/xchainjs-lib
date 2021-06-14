'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ethers = require('ethers');
var providers = require('@ethersproject/providers');
var utils = require('ethers/lib/utils');
var xchainUtil = require('@xchainjs/xchain-util');
var Crypto = require('@xchainjs/xchain-crypto');
var axios = require('axios');
var lib = require('@xchainjs/xchain-util/lib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

(function (Network) {
    Network["TEST"] = "ropsten";
    Network["MAIN"] = "homestead";
})(exports.Network || (exports.Network = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var erc20ABI = [
	{
		inputs: [
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "success",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "success",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "success",
				type: "bool"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

/**
 * Get address information.
 *
 * @see https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-address-info
 *
 * @param {string} baseUrl The ethplorer api url.
 * @param {string} address
 * @param {string} apiKey The ethplorer API key. (optional)
 * @returns {AddressInfo} The address information.
 */
var getAddress = function (baseUrl, address, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios__default['default'].get(baseUrl + "/getAddressInfo/" + address, {
                        params: {
                            apiKey: apiKey || 'freekey',
                        },
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, Promise.reject(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Get transaction by hash.
 *
 * @see https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-transaction-info
 *
 * @param {string} baseUrl The ethplorer api url.
 * @param {string} hash The transaction hash.
 * @param {string} apiKey The ethplorer API key. (optional)
 * @returns {Transactions} The transaction result.
 */
var getTxInfo = function (baseUrl, hash, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios__default['default'].get(baseUrl + "/getTxInfo/" + hash, {
                        params: {
                            apiKey: apiKey || 'freekey',
                        },
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, Promise.reject(error_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };

var ETH_DECIMAL = 18;
// from https://github.com/MetaMask/metamask-extension/blob/ee205b893fe61dc4736efc576e0663189a9d23da/ui/app/pages/send/send.constants.js#L39
// and based on recommendations of https://ethgasstation.info/blog/gas-limit/
var SIMPLE_GAS_COST = ethers.BigNumber.from(21000);
var BASE_TOKEN_GAS_COST = ethers.BigNumber.from(100000);
// default gas price in gwei
var DEFAULT_GAS_PRICE = 50;
var ETHAddress = '0x0000000000000000000000000000000000000000';
var MAX_APPROVAL = ethers.BigNumber.from(2).pow(256).sub(1);
/**
 * XChainNetwork -> EthNetwork
 *
 * @param {XChainNetwork} network
 * @returns {EthNetwork}
 */
var xchainNetworkToEths = function (network) {
    switch (network) {
        // DO NOT use switch/case's default branch
        // to be sure that ALL possible cases are
        // processed in a similar way to reverted ethNetworkToXchains
        case 'mainnet':
            return exports.Network.MAIN;
        case 'testnet':
            return exports.Network.TEST;
    }
};
/**
 * EthNetwork -> XChainNetwork
 *
 * @param {EthNetwork} network
 * @returns {XChainNetwork}
 */
var ethNetworkToXchains = function (network) {
    switch (network) {
        // DO NOT use switch/case's default branch
        // to be sure that ALL possible cases are
        // processed in a similar way to reverted xchainNetworkToEths
        case exports.Network.MAIN:
            return 'mainnet';
        case exports.Network.TEST:
            return 'testnet';
    }
};
/**
 * Validate the given address.
 *
 * @param {Address} address
 * @returns {boolean} `true` or `false`
 */
var validateAddress = function (address) {
    try {
        ethers.ethers.utils.getAddress(address);
        return true;
    }
    catch (error) {
        return false;
    }
};
/**
 * Get token address from asset.
 *
 * @param {Asset} asset
 * @returns {string|null} The token address.
 */
var getTokenAddress = function (asset) {
    try {
        // strip 0X only - 0x is still valid
        return ethers.ethers.utils.getAddress(asset.symbol.slice(asset.ticker.length + 1).replace(/^0X/, ''));
    }
    catch (err) {
        return null;
    }
};
/**
 * Check if the symbol is valid.
 *
 * @param {string|null|undefined} symbol
 * @returns {boolean} `true` or `false`.
 */
var validateSymbol = function (symbol) { return (symbol ? symbol.length >= 3 : false); };
/**
 * Get transactions from token tx
 *
 * @param {TokenTransactionInfo} tx
 * @returns {Tx|null} The parsed transaction.
 */
var getTxFromTokenTransaction = function (tx) {
    var decimals = parseInt(tx.tokenDecimal) || ETH_DECIMAL;
    var symbol = tx.tokenSymbol;
    var address = tx.contractAddress;
    if (validateSymbol(symbol) && validateAddress(address)) {
        var tokenAsset = xchainUtil.assetFromString(xchainUtil.ETHChain + "." + symbol + "-" + address);
        if (tokenAsset) {
            return {
                asset: tokenAsset,
                from: [
                    {
                        from: tx.from,
                        amount: xchainUtil.baseAmount(tx.value, decimals),
                    },
                ],
                to: [
                    {
                        to: tx.to,
                        amount: xchainUtil.baseAmount(tx.value, decimals),
                    },
                ],
                date: new Date(parseInt(tx.timeStamp) * 1000),
                type: 'transfer',
                hash: tx.hash,
            };
        }
    }
    return null;
};
/**
 * Get transactions from ETH transaction
 *
 * @param {ETHTransactionInfo} tx
 * @returns {Tx} The parsed transaction.
 */
var getTxFromEthTransaction = function (tx) {
    return {
        asset: xchainUtil.AssetETH,
        from: [
            {
                from: tx.from,
                amount: xchainUtil.baseAmount(tx.value, ETH_DECIMAL),
            },
        ],
        to: [
            {
                to: tx.to,
                amount: xchainUtil.baseAmount(tx.value, ETH_DECIMAL),
            },
        ],
        date: new Date(parseInt(tx.timeStamp) * 1000),
        type: 'transfer',
        hash: tx.hash,
    };
};
/**
 * Get transactions from operation
 *
 * @param {TransactionOperation} operation
 * @returns {Tx|null} The parsed transaction.
 */
var getTxFromEthplorerTokenOperation = function (operation) {
    var decimals = parseInt(operation.tokenInfo.decimals) || ETH_DECIMAL;
    var _a = operation.tokenInfo, symbol = _a.symbol, address = _a.address;
    if (validateSymbol(symbol) && validateAddress(address)) {
        var tokenAsset = xchainUtil.assetFromString(xchainUtil.ETHChain + "." + symbol + "-" + address);
        if (tokenAsset) {
            return {
                asset: tokenAsset,
                from: [
                    {
                        from: operation.from,
                        amount: xchainUtil.baseAmount(operation.value, decimals),
                    },
                ],
                to: [
                    {
                        to: operation.to,
                        amount: xchainUtil.baseAmount(operation.value, decimals),
                    },
                ],
                date: new Date(operation.timestamp * 1000),
                type: operation.type === 'transfer' ? 'transfer' : 'unknown',
                hash: operation.transactionHash,
            };
        }
    }
    return null;
};
/**
 * Get transactions from ETH transaction
 *
 * @param {TransactionInfo} txInfo
 * @returns {Tx} The parsed transaction.
 */
var getTxFromEthplorerEthTransaction = function (txInfo) {
    return {
        asset: xchainUtil.AssetETH,
        from: [
            {
                from: txInfo.from,
                amount: xchainUtil.assetToBase(xchainUtil.assetAmount(txInfo.value, ETH_DECIMAL)),
            },
        ],
        to: [
            {
                to: txInfo.to,
                amount: xchainUtil.assetToBase(xchainUtil.assetAmount(txInfo.value, ETH_DECIMAL)),
            },
        ],
        date: new Date(txInfo.timestamp * 1000),
        type: 'transfer',
        hash: txInfo.hash,
    };
};
/**
 * Calculate fees by multiplying .
 *
 * @returns {Fees} The default gas price.
 */
var getFee = function (_a) {
    var gasPrice = _a.gasPrice, gasLimit = _a.gasLimit;
    return xchainUtil.baseAmount(gasPrice.amount().multipliedBy(gasLimit.toString()), ETH_DECIMAL);
};
var estimateDefaultFeesWithGasPricesAndLimits = function (asset) {
    var gasPrices = {
        average: xchainUtil.baseAmount(utils.parseUnits(DEFAULT_GAS_PRICE.toString(), 'gwei').toString(), ETH_DECIMAL),
        fast: xchainUtil.baseAmount(utils.parseUnits((DEFAULT_GAS_PRICE * 2).toString(), 'gwei').toString(), ETH_DECIMAL),
        fastest: xchainUtil.baseAmount(utils.parseUnits((DEFAULT_GAS_PRICE * 3).toString(), 'gwei').toString(), ETH_DECIMAL),
    };
    var fastGP = gasPrices.fast, fastestGP = gasPrices.fastest, averageGP = gasPrices.average;
    var assetAddress;
    if (asset && xchainUtil.assetToString(asset) !== xchainUtil.assetToString(xchainUtil.AssetETH)) {
        assetAddress = getTokenAddress(asset);
    }
    var gasLimit;
    if (assetAddress && assetAddress !== ETHAddress) {
        gasLimit = ethers.BigNumber.from(BASE_TOKEN_GAS_COST);
    }
    else {
        gasLimit = ethers.BigNumber.from(SIMPLE_GAS_COST);
    }
    return {
        gasPrices: gasPrices,
        gasLimit: gasLimit,
        fees: {
            type: 'byte',
            average: getFee({ gasPrice: averageGP, gasLimit: gasLimit }),
            fast: getFee({ gasPrice: fastGP, gasLimit: gasLimit }),
            fastest: getFee({ gasPrice: fastestGP, gasLimit: gasLimit }),
        },
    };
};
/**
 * Get the default fees.
 *
 * @returns {Fees} The default gas price.
 */
var getDefaultFees = function (asset) {
    var fees = estimateDefaultFeesWithGasPricesAndLimits(asset).fees;
    return fees;
};
/**
 * Get the default gas price.
 *
 * @returns {Fees} The default gas prices.
 */
var getDefaultGasPrices = function (asset) {
    var gasPrices = estimateDefaultFeesWithGasPricesAndLimits(asset).gasPrices;
    return gasPrices;
};
/**
 * Get address prefix based on the network.
 *
 * @returns {string} The address prefix based on the network.
 *
 **/
var getPrefix = function () { return '0x'; };
/**
 * Filter self txs
 *
 * @returns {T[]}
 *
 **/
var filterSelfTxs = function (txs) {
    var filterTxs = txs.filter(function (tx) { return tx.from !== tx.to; });
    var selfTxs = txs.filter(function (tx) { return tx.from === tx.to; });
    var _loop_1 = function () {
        var selfTx = selfTxs[0];
        filterTxs.push(selfTx);
        selfTxs = selfTxs.filter(function (tx) { return tx.hash !== selfTx.hash; });
    };
    while (selfTxs.length) {
        _loop_1();
    }
    return filterTxs;
};
/**
 * Get Decimals
 *
 * @param {Asset} asset
 * @returns {Number} the decimal of a given asset
 *
 * @throws {"Invalid asset"} Thrown if the given asset is invalid
 * @throws {"Invalid provider"} Thrown if the given provider is invalid
 */
var getDecimal = function (asset, provider) { return __awaiter(void 0, void 0, void 0, function () {
    var assetAddress, contract, decimal, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (xchainUtil.assetToString(asset) === xchainUtil.assetToString(xchainUtil.AssetETH)) {
                    return [2 /*return*/, Promise.resolve(ETH_DECIMAL)];
                }
                assetAddress = getTokenAddress(asset);
                if (!assetAddress) {
                    throw new Error("Invalid asset " + xchainUtil.assetToString(asset));
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                contract = new ethers.ethers.Contract(assetAddress, erc20ABI, provider);
                return [4 /*yield*/, contract.decimals()];
            case 2:
                decimal = _a.sent();
                return [2 /*return*/, ethers.ethers.BigNumber.from(decimal).toNumber()];
            case 3:
                err_1 = _a.sent();
                throw new Error("Invalid provider: " + err_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Get Token Balances
 *
 * @param {Array<TokenBalance>} tokenBalances
 * @returns {Array<Balance>} the parsed balances
 *
 */
var getTokenBalances = function (tokenBalances) {
    return tokenBalances.reduce(function (acc, cur) {
        var _a;
        var _b = cur.tokenInfo, symbol = _b.symbol, tokenAddress = _b.address;
        if (validateSymbol(symbol) && validateAddress(tokenAddress) && ((_a = cur === null || cur === void 0 ? void 0 : cur.tokenInfo) === null || _a === void 0 ? void 0 : _a.decimals) !== undefined) {
            var decimals = parseInt(cur.tokenInfo.decimals, 10);
            var tokenAsset = xchainUtil.assetFromString(xchainUtil.ETHChain + "." + symbol + "-" + ethers.ethers.utils.getAddress(tokenAddress));
            if (tokenAsset) {
                return __spreadArray(__spreadArray([], acc), [
                    {
                        asset: tokenAsset,
                        amount: xchainUtil.baseAmount(cur.balance, decimals),
                    },
                ]);
            }
        }
        return acc;
    }, []);
};

var getApiKeyQueryParameter = function (apiKey) { return (!!apiKey ? "&apiKey=" + apiKey : ''); };
/**
 * SafeGasPrice, ProposeGasPrice And FastGasPrice returned in string-Gwei
 *
 * @see https://etherscan.io/apis#gastracker
 *
 * @param {string} baseUrl The etherscan node url.
 * @param {string} apiKey The etherscan API key. (optional)
 * @returns {GasOracleResponse} LastBlock, SafeGasPrice, ProposeGasPrice, FastGasPrice
 */
var getGasOracle = function (baseUrl, apiKey) {
    var url = baseUrl + '/api?module=gastracker&action=gasoracle';
    return axios__default['default'].get(url + getApiKeyQueryParameter(apiKey)).then(function (response) { return response.data.result; });
};
/**
 * Get token balance
 *
 * @see https://etherscan.io/apis#tokens
 *
 * @param {string} baseUrl The etherscan node url.
 * @param {string} address The address.
 * @param {string} assetAddress The token contract address.
 * @param {string} apiKey The etherscan API key. (optional)
 * @returns {BigNumberish} The token balance
 */
var getTokenBalance = function (_a) {
    var baseUrl = _a.baseUrl, address = _a.address, assetAddress = _a.assetAddress, apiKey = _a.apiKey;
    var url = baseUrl + ("/api?module=account&action=tokenbalance&contractaddress=" + assetAddress + "&address=" + address);
    return axios__default['default'].get(url + getApiKeyQueryParameter(apiKey)).then(function (response) { return response.data.result; });
};
/**
 * Get ETH transaction history
 *
 * @see https://etherscan.io/apis#accounts
 *
 * @param {string} baseUrl The etherscan node url.
 * @param {string} address The address.
 * @param {TransactionHistoryParam} params The search options.
 * @param {string} apiKey The etherscan API key. (optional)
 * @returns {Array<ETHTransactionInfo>} The ETH transaction history
 */
var getETHTransactionHistory = function (_a) {
    var baseUrl = _a.baseUrl, address = _a.address, page = _a.page, offset = _a.offset, startblock = _a.startblock, endblock = _a.endblock, apiKey = _a.apiKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = baseUrl + "/api?module=account&action=txlist&sort=desc" + getApiKeyQueryParameter(apiKey);
                    if (address)
                        url += "&address=" + address;
                    if (offset)
                        url += "&offset=" + offset;
                    if (page)
                        url += "&page=" + page;
                    if (startblock)
                        url += "&startblock=" + startblock;
                    if (endblock)
                        url += "&endblock=" + endblock;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios__default['default'].get(url).then(function (response) { return response.data.result; })];
                case 2:
                    result = _b.sent();
                    if (JSON.stringify(result).includes('Invalid API Key')) {
                        return [2 /*return*/, Promise.reject(new Error('Invalid API Key'))];
                    }
                    if (typeof result !== typeof []) {
                        throw new Error(result);
                    }
                    return [2 /*return*/, filterSelfTxs(result)
                            .filter(function (tx) { return !lib.bnOrZero(tx.value).isZero(); })
                            .map(getTxFromEthTransaction)];
                case 3:
                    error_1 = _b.sent();
                    return [2 /*return*/, Promise.reject(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
/**
 * Get token transaction history
 *
 * @see https://etherscan.io/apis#accounts
 *
 * @param {string} baseUrl The etherscan node url.
 * @param {string} address The address.
 * @param {TransactionHistoryParam} params The search options.
 * @param {string} apiKey The etherscan API key. (optional)
 * @returns {Array<Tx>} The token transaction history
 */
var getTokenTransactionHistory = function (_a) {
    var baseUrl = _a.baseUrl, address = _a.address, assetAddress = _a.assetAddress, page = _a.page, offset = _a.offset, startblock = _a.startblock, endblock = _a.endblock, apiKey = _a.apiKey;
    return __awaiter(void 0, void 0, void 0, function () {
        var url, result, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = baseUrl + "/api?module=account&action=tokentx&sort=desc" + getApiKeyQueryParameter(apiKey);
                    if (address)
                        url += "&address=" + address;
                    if (assetAddress)
                        url += "&contractaddress=" + assetAddress;
                    if (offset)
                        url += "&offset=" + offset;
                    if (page)
                        url += "&page=" + page;
                    if (startblock)
                        url += "&startblock=" + startblock;
                    if (endblock)
                        url += "&endblock=" + endblock;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios__default['default'].get(url).then(function (response) { return response.data.result; })];
                case 2:
                    result = _b.sent();
                    if (JSON.stringify(result).includes('Invalid API Key')) {
                        return [2 /*return*/, Promise.reject(new Error('Invalid API Key'))];
                    }
                    return [2 /*return*/, filterSelfTxs(result)
                            .filter(function (tx) { return !lib.bnOrZero(tx.value).isZero(); })
                            .reduce(function (acc, cur) {
                            var tx = getTxFromTokenTransaction(cur);
                            return tx ? __spreadArray(__spreadArray([], acc), [tx]) : acc;
                        }, [])];
                case 3:
                    error_2 = _b.sent();
                    return [2 /*return*/, Promise.reject(error_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
};

/**
 * Custom Ethereum client
 */
var Client = /** @class */ (function () {
    /**
     * Constructor
     * @param {EthereumClientParams} params
     */
    function Client(_a) {
        var _this = this;
        var _b = _a.network, network = _b === void 0 ? 'testnet' : _b, _c = _a.ethplorerUrl, ethplorerUrl = _c === void 0 ? 'https://api.ethplorer.io' : _c, _d = _a.ethplorerApiKey, ethplorerApiKey = _d === void 0 ? 'freekey' : _d, explorerUrl = _a.explorerUrl, _e = _a.phrase, phrase = _e === void 0 ? '' : _e, _f = _a.rootDerivationPaths, rootDerivationPaths = _f === void 0 ? {
            mainnet: "m/44'/60'/0'/0/",
            testnet: "m/44'/60'/0'/0/", // this is INCORRECT but makes the unit tests pass
        } : _f, etherscanApiKey = _a.etherscanApiKey, infuraCreds = _a.infuraCreds;
        this.providers = new Map();
        /**
         * Purge client.
         *
         * @returns {void}
         */
        this.purgeClient = function () {
            _this.hdNode = utils.HDNode.fromMnemonic('');
        };
        /**
         * Set/Update the explorer url.
         *
         * @param {string} url The explorer url.
         * @returns {void}
         */
        this.setExplorerURL = function (url) {
            _this.explorerUrl = url;
        };
        /**
         * Get the current network.
         *
         * @returns {Network} The current network. (`mainnet` or `testnet`)
         */
        this.getNetwork = function () {
            return ethNetworkToXchains(_this.network);
        };
        /**
         * Get the current address.
         *
         * @returns {Address} The current address.
         *
         * @throws {"Phrase must be provided"}
         * Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
         */
        this.getAddress = function (index) {
            if (index === void 0) { index = 0; }
            if (index < 0) {
                throw new Error('index must be greater than zero');
            }
            return _this.hdNode.derivePath(_this.getFullDerivationPath(index)).address.toLowerCase();
        };
        /**
         * Get etherjs wallet interface.
         *
         * @returns {Wallet} The current etherjs wallet interface.
         *
         * @throws {"Phrase must be provided"}
         * Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
         */
        this.getWallet = function (index) {
            if (index === void 0) { index = 0; }
            return new ethers.Wallet(_this.hdNode.derivePath(_this.getFullDerivationPath(index))).connect(_this.getProvider());
        };
        this.setupProviders = function () {
            if (_this.infuraCreds) {
                // Infura provider takes either a string of project id
                // or an object of id and secret
                var testnetProvider = _this.infuraCreds.projectSecret
                    ? new ethers.ethers.providers.InfuraProvider(exports.Network.TEST, _this.infuraCreds)
                    : new ethers.ethers.providers.InfuraProvider(exports.Network.TEST, _this.infuraCreds.projectId);
                var mainnetProvider = _this.infuraCreds.projectSecret
                    ? new ethers.ethers.providers.InfuraProvider(exports.Network.MAIN, _this.infuraCreds)
                    : new ethers.ethers.providers.InfuraProvider(exports.Network.MAIN, _this.infuraCreds.projectId);
                _this.providers.set('testnet', testnetProvider);
                _this.providers.set('mainnet', mainnetProvider);
            }
            else {
                _this.providers.set('testnet', providers.getDefaultProvider(exports.Network.TEST));
                _this.providers.set('mainnet', providers.getDefaultProvider(exports.Network.MAIN));
            }
        };
        /**
         * Get etherjs Provider interface.
         *
         * @returns {Provider} The current etherjs Provider interface.
         */
        this.getProvider = function () {
            var net = ethNetworkToXchains(_this.network);
            return _this.providers.get(net) || providers.getDefaultProvider(net);
        };
        /**
         * Get etherjs EtherscanProvider interface.
         *
         * @returns {EtherscanProvider} The current etherjs EtherscanProvider interface.
         */
        this.getEtherscanProvider = function () {
            return new providers.EtherscanProvider(_this.network, _this.etherscanApiKey);
        };
        /**
         * Get the explorer url.
         *
         * @returns {string} The explorer url for ethereum based on the current network.
         */
        this.getExplorerUrl = function () {
            return _this.getExplorerUrlByNetwork(_this.getNetwork());
        };
        /**
         * Get the explorer url.
         *
         * @returns {ExplorerUrl} The explorer url (both mainnet and testnet) for ethereum.
         */
        this.getDefaultExplorerURL = function () {
            return {
                testnet: 'https://ropsten.etherscan.io',
                mainnet: 'https://etherscan.io',
            };
        };
        /**
         * Get the explorer url.
         *
         * @param {Network} network
         * @returns {string} The explorer url for ethereum based on the network.
         */
        this.getExplorerUrlByNetwork = function (network) {
            return _this.explorerUrl[network];
        };
        /**
         * Get the explorer url for the given address.
         *
         * @param {Address} address
         * @returns {string} The explorer url for the given address.
         */
        this.getExplorerAddressUrl = function (address) {
            return _this.getExplorerUrl() + "/address/" + address;
        };
        /**
         * Get the explorer url for the given transaction id.
         *
         * @param {string} txID
         * @returns {string} The explorer url for the given transaction id.
         */
        this.getExplorerTxUrl = function (txID) {
            return _this.getExplorerUrl() + "/tx/" + txID;
        };
        /**
         * Set/update the current network.
         *
         * @param {Network} network `mainnet` or `testnet`.
         * @returns {void}
         *
         * @throws {"Network must be provided"}
         * Thrown if network has not been set before.
         */
        this.setNetwork = function (network) {
            if (!network) {
                throw new Error('Network must be provided');
            }
            else {
                _this.network = xchainNetworkToEths(network);
            }
        };
        /**
         * Set/update a new phrase (Eg. If user wants to change wallet)
         *
         * @param {string} phrase A new phrase.
         * @returns {Address} The address from the given phrase
         *
         * @throws {"Invalid phrase"}
         * Thrown if the given phase is invalid.
         */
        this.setPhrase = function (phrase, walletIndex) {
            if (walletIndex === void 0) { walletIndex = 0; }
            if (!Crypto.validatePhrase(phrase)) {
                throw new Error('Invalid phrase');
            }
            _this.hdNode = utils.HDNode.fromMnemonic(phrase);
            return _this.getAddress(walletIndex);
        };
        /**
         * Validate the given address.
         *
         * @param {Address} address
         * @returns {boolean} `true` or `false`
         */
        this.validateAddress = function (address) {
            return validateAddress(address);
        };
        /**
         * Get the ETH balance of a given address.
         *
         * @param {Address} address By default, it will return the balance of the current wallet. (optional)
         * @returns {Array<Balances>} The all balance of the address.
         *
         * @throws {"Invalid asset"} throws when the give asset is an invalid one
         */
        this.getBalance = function (address, assets) { return __awaiter(_this, void 0, void 0, function () {
            var ethAddress, ethBalance, ethBalanceAmount, account, balances, newAssets, balances, i, asset, etherscan, assetAddress, balance, decimals, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 13, , 14]);
                        ethAddress = address || this.getAddress();
                        return [4 /*yield*/, this.getProvider().getBalance(ethAddress)];
                    case 1:
                        ethBalance = _c.sent();
                        ethBalanceAmount = xchainUtil.baseAmount(ethBalance.toString(), ETH_DECIMAL);
                        if (!(this.getNetwork() === 'mainnet')) return [3 /*break*/, 3];
                        return [4 /*yield*/, getAddress(this.ethplorerUrl, address, this.ethplorerApiKey)];
                    case 2:
                        account = _c.sent();
                        balances = [
                            {
                                asset: xchainUtil.AssetETH,
                                amount: ethBalanceAmount,
                            },
                        ];
                        if (account.tokens) {
                            balances.push.apply(balances, getTokenBalances(account.tokens));
                        }
                        return [2 /*return*/, balances];
                    case 3:
                        newAssets = assets || [xchainUtil.AssetETH];
                        balances = [];
                        i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(i < newAssets.length)) return [3 /*break*/, 11];
                        asset = newAssets[i];
                        etherscan = this.getEtherscanProvider();
                        if (!(xchainUtil.assetToString(asset) !== xchainUtil.assetToString(xchainUtil.AssetETH))) return [3 /*break*/, 7];
                        assetAddress = getTokenAddress(asset);
                        if (!assetAddress) {
                            throw new Error("Invalid asset " + asset);
                        }
                        return [4 /*yield*/, getTokenBalance({
                                baseUrl: etherscan.baseUrl,
                                address: address,
                                assetAddress: assetAddress,
                                apiKey: etherscan.apiKey,
                            })];
                    case 5:
                        balance = _c.sent();
                        _b = (_a = ethers.BigNumber).from;
                        return [4 /*yield*/, this.call(0, assetAddress, erc20ABI, 'decimals', [])];
                    case 6:
                        decimals = _b.apply(_a, [_c.sent()]).toNumber() ||
                            ETH_DECIMAL;
                        if (!Number.isNaN(decimals)) {
                            balances.push({
                                asset: asset,
                                amount: xchainUtil.baseAmount(balance.toString(), decimals),
                            });
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        balances.push({
                            asset: xchainUtil.AssetETH,
                            amount: ethBalanceAmount,
                        });
                        _c.label = 8;
                    case 8: 
                    // Due to etherscan api call limitation, put some delay before another call
                    // Free Etherscan api key limit: 5 calls per second
                    // So 0.3s delay is reasonable for now
                    return [4 /*yield*/, xchainUtil.delay(300)];
                    case 9:
                        // Due to etherscan api call limitation, put some delay before another call
                        // Free Etherscan api key limit: 5 calls per second
                        // So 0.3s delay is reasonable for now
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 4];
                    case 11: return [2 /*return*/, balances];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        error_1 = _c.sent();
                        if (error_1.toString().includes('Invalid API Key')) {
                            return [2 /*return*/, Promise.reject(new Error('Invalid API Key'))];
                        }
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 14: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get transaction history of a given address with pagination options.
         * By default it will return the transaction history of the current wallet.
         *
         * @param {TxHistoryParams} params The options to get transaction history. (optional)
         * @returns {TxsPage} The transaction history.
         */
        this.getTransactions = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var offset_1, limit_1, assetAddress, maxCount, transations, etherscan, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        offset_1 = (params === null || params === void 0 ? void 0 : params.offset) || 0;
                        limit_1 = (params === null || params === void 0 ? void 0 : params.limit) || 10;
                        assetAddress = params === null || params === void 0 ? void 0 : params.asset;
                        maxCount = 10000;
                        transations = void 0;
                        etherscan = this.getEtherscanProvider();
                        if (!assetAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, getTokenTransactionHistory({
                                baseUrl: etherscan.baseUrl,
                                address: params === null || params === void 0 ? void 0 : params.address,
                                assetAddress: assetAddress,
                                page: 0,
                                offset: maxCount,
                                apiKey: etherscan.apiKey,
                            })];
                    case 1:
                        transations = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, getETHTransactionHistory({
                            baseUrl: etherscan.baseUrl,
                            address: params === null || params === void 0 ? void 0 : params.address,
                            page: 0,
                            offset: maxCount,
                            apiKey: etherscan.apiKey,
                        })];
                    case 3:
                        transations = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            total: transations.length,
                            txs: transations.filter(function (_, index) { return index >= offset_1 && index < offset_1 + limit_1; }),
                        }];
                    case 5:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
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
        this.getTransactionData = function (txId, assetAddress) { return __awaiter(_this, void 0, void 0, function () {
            var txInfo, tx, tx, etherscan, txInfo, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 9, , 10]);
                        if (!(this.getNetwork() === 'mainnet')) return [3 /*break*/, 2];
                        return [4 /*yield*/, getTxInfo(this.ethplorerUrl, txId, this.ethplorerApiKey)];
                    case 1:
                        txInfo = _c.sent();
                        if (txInfo.operations && txInfo.operations.length > 0) {
                            tx = getTxFromEthplorerTokenOperation(txInfo.operations[0]);
                            if (!tx) {
                                throw new Error('Could not parse transaction data');
                            }
                            return [2 /*return*/, tx];
                        }
                        else {
                            return [2 /*return*/, getTxFromEthplorerEthTransaction(txInfo)];
                        }
                    case 2:
                        tx = void 0;
                        etherscan = this.getEtherscanProvider();
                        return [4 /*yield*/, etherscan.getTransaction(txId)];
                    case 3:
                        txInfo = _c.sent();
                        if (!txInfo) return [3 /*break*/, 7];
                        if (!assetAddress) return [3 /*break*/, 5];
                        return [4 /*yield*/, getTokenTransactionHistory({
                                baseUrl: etherscan.baseUrl,
                                assetAddress: assetAddress,
                                startblock: txInfo.blockNumber,
                                endblock: txInfo.blockNumber,
                                apiKey: etherscan.apiKey,
                            })];
                    case 4:
                        tx =
                            (_a = (_c.sent()).filter(function (info) { return info.hash === txId; })[0]) !== null && _a !== void 0 ? _a : null;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, getETHTransactionHistory({
                            baseUrl: etherscan.baseUrl,
                            startblock: txInfo.blockNumber,
                            endblock: txInfo.blockNumber,
                            apiKey: etherscan.apiKey,
                            address: txInfo.from,
                        })];
                    case 6:
                        tx =
                            (_b = (_c.sent()).filter(function (info) { return info.hash === txId; })[0]) !== null && _b !== void 0 ? _b : null;
                        _c.label = 7;
                    case 7:
                        if (!tx) {
                            throw new Error('Could not get transaction history');
                        }
                        return [2 /*return*/, tx];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_3 = _c.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.call = function (walletIndex, contractAddress, abi, func, params) {
            if (walletIndex === void 0) { walletIndex = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                var contract;
                return __generator(this, function (_a) {
                    if (!contractAddress) {
                        return [2 /*return*/, Promise.reject(new Error('contractAddress must be provided'))];
                    }
                    contract = new ethers.ethers.Contract(contractAddress, abi, this.getProvider()).connect(this.getWallet(walletIndex));
                    return [2 /*return*/, contract[func].apply(contract, params)];
                });
            });
        };
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
        this.estimateCall = function (contractAddress, abi, func, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params) { return __awaiter(_this, void 0, void 0, function () {
            var contract;
            var _a;
            return __generator(this, function (_b) {
                if (!contractAddress) {
                    return [2 /*return*/, Promise.reject(new Error('contractAddress must be provided'))];
                }
                contract = new ethers.ethers.Contract(contractAddress, abi, this.getProvider()).connect(this.getWallet(0));
                return [2 /*return*/, (_a = contract.estimateGas)[func].apply(_a, params)];
            });
        }); };
        /**
         * Check allowance.
         *
         * @param {Address} spender The spender address.
         * @param {Address} sender The sender address.
         * @param {BaseAmount} amount The amount of token.
         * @returns {boolean} `true` or `false`.
         */
        this.isApproved = function (spender, sender, amount) { return __awaiter(_this, void 0, void 0, function () {
            var txAmount, allowance, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        txAmount = ethers.BigNumber.from(amount.amount().toFixed());
                        return [4 /*yield*/, this.call(0, sender, erc20ABI, 'allowance', [spender, spender])];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, txAmount.lte(allowance)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
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
        this.approve = function (_a) {
            var _b = _a.walletIndex, walletIndex = _b === void 0 ? 0 : _b, spender = _a.spender, sender = _a.sender, feeOptionKey = _a.feeOptionKey, amount = _a.amount;
            return __awaiter(_this, void 0, void 0, function () {
                var gasPrice, _c, _d, _e, gasLimit, txAmount, txResult, error_5;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _c = feeOptionKey;
                            if (!_c) return [3 /*break*/, 2];
                            _e = (_d = ethers.BigNumber).from;
                            return [4 /*yield*/, this.estimateGasPrices()
                                    .then(function (prices) { return prices[feeOptionKey]; })
                                    .catch(function () { return getDefaultGasPrices()[feeOptionKey]; })];
                        case 1:
                            _c = _e.apply(_d, [(_f.sent())
                                    .amount()
                                    .toFixed()]);
                            _f.label = 2;
                        case 2:
                            gasPrice = _c;
                            return [4 /*yield*/, this.estimateApprove({ spender: spender, sender: sender, amount: amount }).catch(function () { return undefined; })];
                        case 3:
                            gasLimit = _f.sent();
                            _f.label = 4;
                        case 4:
                            _f.trys.push([4, 6, , 7]);
                            txAmount = amount ? ethers.BigNumber.from(amount.amount().toFixed()) : MAX_APPROVAL;
                            return [4 /*yield*/, this.call(walletIndex, sender, erc20ABI, 'approve', [
                                    spender,
                                    txAmount,
                                    { from: this.getAddress(), gasPrice: gasPrice, gasLimit: gasLimit },
                                ])];
                        case 5:
                            txResult = _f.sent();
                            return [2 /*return*/, txResult];
                        case 6:
                            error_5 = _f.sent();
                            return [2 /*return*/, Promise.reject(error_5)];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Estimate gas limit of approve.
         *
         * @param {Address} spender The spender address.
         * @param {Address} sender The sender address.
         * @param {BaseAmount} amount The amount of token. By default, it will be unlimited token allowance. (optional)
         * @returns {BigNumber} The estimated gas limit.
         */
        this.estimateApprove = function (_a) {
            var spender = _a.spender, sender = _a.sender, amount = _a.amount;
            return __awaiter(_this, void 0, void 0, function () {
                var txAmount, gasLimit, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            txAmount = amount ? ethers.BigNumber.from(amount.amount().toFixed()) : MAX_APPROVAL;
                            return [4 /*yield*/, this.estimateCall(sender, erc20ABI, 'approve', [
                                    spender,
                                    txAmount,
                                    { from: this.getAddress() },
                                ])];
                        case 1:
                            gasLimit = _b.sent();
                            return [2 /*return*/, gasLimit];
                        case 2:
                            error_6 = _b.sent();
                            return [2 /*return*/, Promise.reject(error_6)];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
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
        this.transfer = function (_a) {
            var _b = _a.walletIndex, walletIndex = _b === void 0 ? 0 : _b, asset = _a.asset, memo = _a.memo, amount = _a.amount, recipient = _a.recipient, feeOptionKey = _a.feeOptionKey, gasPrice = _a.gasPrice, gasLimit = _a.gasLimit;
            return __awaiter(_this, void 0, void 0, function () {
                var txAmount, assetAddress, isETHAddress, defaultGasLimit_1, overrides, gasPrice_1, gasLimit_1, txResult, transactionRequest, error_7;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 8, , 9]);
                            txAmount = ethers.BigNumber.from(amount.amount().toFixed());
                            assetAddress = void 0;
                            if (asset && xchainUtil.assetToString(asset) !== xchainUtil.assetToString(xchainUtil.AssetETH)) {
                                assetAddress = getTokenAddress(asset);
                            }
                            isETHAddress = assetAddress === ETHAddress;
                            defaultGasLimit_1 = isETHAddress ? SIMPLE_GAS_COST : BASE_TOKEN_GAS_COST;
                            overrides = {
                                gasLimit: gasLimit || defaultGasLimit_1,
                                gasPrice: gasPrice && ethers.BigNumber.from(gasPrice.amount().toFixed()),
                            };
                            if (!feeOptionKey) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.estimateGasPrices()
                                    .then(function (prices) { return prices[feeOptionKey]; })
                                    .catch(function () { return getDefaultGasPrices()[feeOptionKey]; })];
                        case 1:
                            gasPrice_1 = _c.sent();
                            return [4 /*yield*/, this.estimateGasLimit({ asset: asset, recipient: recipient, amount: amount, memo: memo }).catch(function () { return defaultGasLimit_1; })];
                        case 2:
                            gasLimit_1 = _c.sent();
                            overrides = {
                                gasLimit: gasLimit_1,
                                gasPrice: ethers.BigNumber.from(gasPrice_1.amount().toFixed()),
                            };
                            _c.label = 3;
                        case 3:
                            txResult = void 0;
                            if (!(assetAddress && !isETHAddress)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.call(walletIndex, assetAddress, erc20ABI, 'transfer', [
                                    recipient,
                                    txAmount,
                                    Object.assign({}, overrides),
                                ])];
                        case 4:
                            // Transfer ERC20
                            txResult = _c.sent();
                            return [3 /*break*/, 7];
                        case 5:
                            transactionRequest = Object.assign({ to: recipient, value: txAmount }, __assign(__assign({}, overrides), { data: memo ? utils.toUtf8Bytes(memo) : undefined }));
                            return [4 /*yield*/, this.getWallet().sendTransaction(transactionRequest)];
                        case 6:
                            txResult = _c.sent();
                            _c.label = 7;
                        case 7: return [2 /*return*/, txResult.hash];
                        case 8:
                            error_7 = _c.sent();
                            return [2 /*return*/, Promise.reject(error_7)];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Estimate gas price.
         * @see https://etherscan.io/apis#gastracker
         *
         * @returns {GasPrices} The gas prices (average, fast, fastest) in `Wei` (`BaseAmount`)
         *
         * @throws {"Failed to estimate gas price"} Thrown if failed to estimate gas price.
         */
        this.estimateGasPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var etherscan, response, averageWei, fastWei, fastestWei, error_8;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        etherscan = this.getEtherscanProvider();
                        return [4 /*yield*/, getGasOracle(etherscan.baseUrl, etherscan.apiKey)
                            // Convert result of gas prices: `Gwei` -> `Wei`
                        ];
                    case 1:
                        response = _b.sent();
                        averageWei = utils.parseUnits(response.SafeGasPrice, 'gwei');
                        fastWei = utils.parseUnits(response.ProposeGasPrice, 'gwei');
                        fastestWei = utils.parseUnits(response.FastGasPrice, 'gwei');
                        return [2 /*return*/, {
                                average: xchainUtil.baseAmount(averageWei.toString(), ETH_DECIMAL),
                                fast: xchainUtil.baseAmount(fastWei.toString(), ETH_DECIMAL),
                                fastest: xchainUtil.baseAmount(fastestWei.toString(), ETH_DECIMAL),
                            }];
                    case 2:
                        error_8 = _b.sent();
                        return [2 /*return*/, Promise.reject(new Error("Failed to estimate gas price: " + ((_a = error_8.msg) !== null && _a !== void 0 ? _a : error_8.toString())))];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Estimate gas.
         *
         * @param {FeesParams} params The transaction options.
         * @returns {BaseAmount} The estimated gas fee.
         *
         * @throws {"Failed to estimate gas limit"} Thrown if failed to estimate gas limit.
         */
        this.estimateGasLimit = function (_a) {
            var asset = _a.asset, recipient = _a.recipient, amount = _a.amount, memo = _a.memo;
            return __awaiter(_this, void 0, void 0, function () {
                var txAmount, assetAddress, estimate, contract, transactionRequest, error_9;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 5, , 6]);
                            txAmount = ethers.BigNumber.from(amount.amount().toFixed());
                            assetAddress = void 0;
                            if (asset && xchainUtil.assetToString(asset) !== xchainUtil.assetToString(xchainUtil.AssetETH)) {
                                assetAddress = getTokenAddress(asset);
                            }
                            estimate = void 0;
                            if (!(assetAddress && assetAddress !== ETHAddress)) return [3 /*break*/, 2];
                            contract = new ethers.ethers.Contract(assetAddress, erc20ABI, this.getProvider());
                            return [4 /*yield*/, contract.estimateGas.transfer(recipient, txAmount, {
                                    from: this.getAddress(),
                                })];
                        case 1:
                            estimate = _c.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            transactionRequest = {
                                from: this.getAddress(),
                                to: recipient,
                                value: txAmount,
                                data: memo ? utils.toUtf8Bytes(memo) : undefined,
                            };
                            return [4 /*yield*/, this.getProvider().estimateGas(transactionRequest)];
                        case 3:
                            estimate = _c.sent();
                            _c.label = 4;
                        case 4: return [2 /*return*/, estimate];
                        case 5:
                            error_9 = _c.sent();
                            return [2 /*return*/, Promise.reject(new Error("Failed to estimate gas limit: " + ((_b = error_9.msg) !== null && _b !== void 0 ? _b : error_9.toString())))];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Estimate gas prices/limits (average, fast fastest).
         *
         * @param {FeesParams} params
         * @returns {FeesWithGasPricesAndLimits} The estimated gas prices/limits.
         *
         * @throws {"Failed to estimate fees, gas price, gas limit"} Thrown if failed to estimate fees, gas price, gas limit.
         */
        this.estimateFeesWithGasPricesAndLimits = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var gasPrices, fastGP, fastestGP, averageGP, gasLimit, error_10;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.estimateGasPrices()];
                    case 1:
                        gasPrices = _b.sent();
                        fastGP = gasPrices.fast, fastestGP = gasPrices.fastest, averageGP = gasPrices.average;
                        return [4 /*yield*/, this.estimateGasLimit({
                                asset: params.asset,
                                amount: params.amount,
                                recipient: params.recipient,
                                memo: params.memo,
                            })];
                    case 2:
                        gasLimit = _b.sent();
                        return [2 /*return*/, {
                                gasPrices: gasPrices,
                                fees: {
                                    type: 'byte',
                                    average: getFee({ gasPrice: averageGP, gasLimit: gasLimit }),
                                    fast: getFee({ gasPrice: fastGP, gasLimit: gasLimit }),
                                    fastest: getFee({ gasPrice: fastestGP, gasLimit: gasLimit }),
                                },
                                gasLimit: gasLimit,
                            }];
                    case 3:
                        error_10 = _b.sent();
                        return [2 /*return*/, Promise.reject(new Error("Failed to estimate fees, gas price, gas limit: " + ((_a = error_10.msg) !== null && _a !== void 0 ? _a : error_10.toString())))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get fees.
         *
         * @param {FeesParams} params
         * @returns {Fees} The average/fast/fastest fees.
         *
         * @throws {"Failed to get fees"} Thrown if failed to get fees.
         */
        this.getFees = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var fees, error_11;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params)
                            return [2 /*return*/, Promise.reject('Params need to be passed')];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.estimateFeesWithGasPricesAndLimits(params)];
                    case 2:
                        fees = (_b.sent()).fees;
                        return [2 /*return*/, fees];
                    case 3:
                        error_11 = _b.sent();
                        return [2 /*return*/, Promise.reject(new Error("Failed to get fees: " + ((_a = error_11.msg) !== null && _a !== void 0 ? _a : error_11.toString())))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.rootDerivationPaths = rootDerivationPaths;
        this.network = xchainNetworkToEths(network);
        this.setPhrase(phrase);
        this.infuraCreds = infuraCreds;
        this.etherscanApiKey = etherscanApiKey;
        this.ethplorerUrl = ethplorerUrl;
        this.ethplorerApiKey = ethplorerApiKey;
        this.explorerUrl = explorerUrl || this.getDefaultExplorerURL();
        this.setupProviders();
    }
    /**
     * Get getFullDerivationPath
     *
     * @param {number} index the HD wallet index
     * @returns {string} The derivation path based on the network.
     */
    Client.prototype.getFullDerivationPath = function (index) {
        return this.rootDerivationPaths[this.getNetwork()] + ("" + index);
    };
    return Client;
}());

exports.Client = Client;
exports.ETHAddress = ETHAddress;
exports.ETH_DECIMAL = ETH_DECIMAL;
exports.estimateDefaultFeesWithGasPricesAndLimits = estimateDefaultFeesWithGasPricesAndLimits;
exports.getDecimal = getDecimal;
exports.getDefaultFees = getDefaultFees;
exports.getFee = getFee;
exports.getPrefix = getPrefix;
exports.getTokenAddress = getTokenAddress;
exports.validateAddress = validateAddress;
//# sourceMappingURL=index.js.map

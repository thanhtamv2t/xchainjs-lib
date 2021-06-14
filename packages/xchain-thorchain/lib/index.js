'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');
var xchainCosmos = require('@xchainjs/xchain-cosmos');
var xchainUtil = require('@xchainjs/xchain-util');
var xchainCrypto = require('@xchainjs/xchain-crypto');
var cosmosClient = require('cosmos-client');
var auth = require('cosmos-client/x/auth');
var bank = require('cosmos-client/x/bank');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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

var THORChain = 'THOR';
var AssetRune = { chain: THORChain, symbol: 'RUNE', ticker: 'RUNE' };

var MsgNativeTx = /** @class */ (function (_super) {
    __extends(MsgNativeTx, _super);
    /**
     *
     * @param from_address
     * @param to_address
     * @param amount
     */
    function MsgNativeTx(coins, memo, signer) {
        var _this = _super.call(this) || this;
        _this.coins = coins;
        _this.memo = memo;
        _this.signer = signer;
        return _this;
    }
    return MsgNativeTx;
}(cosmosClient.Msg));
/**
 * This creates MsgNativeTx from json.
 *
 * @param value
 * @returns {MsgNativeTx}
 */
var msgNativeTxFromJson = function (value) {
    return new MsgNativeTx(value.coins, value.memo, cosmosClient.AccAddress.fromBech32(value.signer));
};

var DECIMAL = 8;
var DEFAULT_GAS_VALUE = '2000000';
var MSG_SEND = 'send';
var MSG_DEPOSIT = 'deposit';
var MAX_TX_COUNT = 100;
/**
 * Get denomination from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination of the given asset.
 */
var getDenom = function (asset) {
    if (xchainUtil.assetToString(asset) === xchainUtil.assetToString(AssetRune))
        return 'rune';
    return asset.symbol;
};
/**
 * Get denomination with chainname from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination with chainname of the given asset.
 */
var getDenomWithChain = function (asset) {
    return xchainUtil.THORChain + "." + asset.symbol.toUpperCase();
};
/**
 * Get Asset from denomination
 *
 * @param {string} denom
 * @returns {Asset|null} The asset of the given denomination.
 */
var getAsset = function (denom) {
    if (denom === getDenom(AssetRune))
        return AssetRune;
    return xchainUtil.assetFromString(xchainUtil.THORChain + "." + denom.toUpperCase());
};
/**
 * Type guard for MsgSend
 *
 * @param {Msg} msg
 * @returns {boolean} `true` or `false`.
 */
var isMsgSend = function (msg) {
    var _a, _b, _c;
    return ((_a = msg) === null || _a === void 0 ? void 0 : _a.amount) !== undefined &&
        ((_b = msg) === null || _b === void 0 ? void 0 : _b.from_address) !== undefined &&
        ((_c = msg) === null || _c === void 0 ? void 0 : _c.to_address) !== undefined;
};
/**
 * Type guard for MsgMultiSend
 *
 * @param {Msg} msg
 * @returns {boolean} `true` or `false`.
 */
var isMsgMultiSend = function (msg) { var _a, _b; return ((_a = msg) === null || _a === void 0 ? void 0 : _a.inputs) !== undefined && ((_b = msg) === null || _b === void 0 ? void 0 : _b.outputs) !== undefined; };
/**
 * Response guard for transaction broadcast
 *
 * @param {any} response The response from the node.
 * @returns {boolean} `true` or `false`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isBroadcastSuccess = function (response) { return response.logs !== undefined; };
/**
 * Get address prefix based on the network.
 *
 * @param {string} network
 * @returns {string} The address prefix based on the network.
 *
 **/
var getPrefix = function (network) { return (network === 'testnet' ? 'tthor' : 'thor'); };
/**
 * Register Codecs based on the network.
 *
 * @param {Network}
 */
var registerCodecs = function (network) {
    cosmosClient.codec.registerCodec('thorchain/MsgSend', bank.MsgSend, bank.MsgSend.fromJSON);
    cosmosClient.codec.registerCodec('thorchain/MsgMultiSend', bank.MsgMultiSend, bank.MsgMultiSend.fromJSON);
    var prefix = getPrefix(network);
    cosmosClient.AccAddress.setBech32Prefix(prefix, prefix + 'pub', prefix + 'valoper', prefix + 'valoperpub', prefix + 'valcons', prefix + 'valconspub');
};
/**
 * Parse transaction type
 *
 * @param {Array<TxResponse>} txs The transaction response from the node.
 * @param {Asset} mainAsset Current main asset which depends on the network.
 * @returns {Txs} The parsed transaction result.
 */
var getTxsFromHistory = function (txs, network) {
    registerCodecs(network);
    return txs.reduce(function (acc, tx) {
        var msgs = [];
        if (tx.tx.body === undefined) {
            msgs = cosmosClient.codec.fromJSONString(cosmosClient.codec.toJSONString(tx.tx)).msg;
        }
        else {
            msgs = cosmosClient.codec.fromJSONString(cosmosClient.codec.toJSONString(tx.tx.body.messages));
        }
        var from = [];
        var to = [];
        msgs.map(function (msg) {
            if (isMsgSend(msg)) {
                var msgSend_1 = msg;
                var amount = msgSend_1.amount
                    .map(function (coin) { return xchainUtil.baseAmount(coin.amount, DECIMAL); })
                    .reduce(function (acc, cur) { return xchainUtil.baseAmount(acc.amount().plus(cur.amount()), DECIMAL); }, xchainUtil.baseAmount(0, DECIMAL));
                var from_index_1 = -1;
                from.forEach(function (value, index) {
                    if (value.from === msgSend_1.from_address.toBech32())
                        from_index_1 = index;
                });
                if (from_index_1 === -1) {
                    from.push({
                        from: msgSend_1.from_address.toBech32(),
                        amount: amount,
                    });
                }
                else {
                    from[from_index_1].amount = xchainUtil.baseAmount(from[from_index_1].amount.amount().plus(amount.amount()), DECIMAL);
                }
                var to_index_1 = -1;
                to.forEach(function (value, index) {
                    if (value.to === msgSend_1.to_address.toBech32())
                        to_index_1 = index;
                });
                if (to_index_1 === -1) {
                    to.push({
                        to: msgSend_1.to_address.toBech32(),
                        amount: amount,
                    });
                }
                else {
                    to[to_index_1].amount = xchainUtil.baseAmount(to[to_index_1].amount.amount().plus(amount.amount()), DECIMAL);
                }
            }
            else if (isMsgMultiSend(msg)) {
                var msgMultiSend = msg;
                msgMultiSend.inputs.map(function (input) {
                    var amount = input.coins
                        .map(function (coin) { return xchainUtil.baseAmount(coin.amount, DECIMAL); })
                        .reduce(function (acc, cur) { return xchainUtil.baseAmount(acc.amount().plus(cur.amount()), DECIMAL); }, xchainUtil.baseAmount(0, DECIMAL));
                    var from_index = -1;
                    from.forEach(function (value, index) {
                        if (value.from === input.address)
                            from_index = index;
                    });
                    if (from_index === -1) {
                        from.push({
                            from: input.address,
                            amount: amount,
                        });
                    }
                    else {
                        from[from_index].amount = xchainUtil.baseAmount(from[from_index].amount.amount().plus(amount.amount()), DECIMAL);
                    }
                });
                msgMultiSend.outputs.map(function (output) {
                    var amount = output.coins
                        .map(function (coin) { return xchainUtil.baseAmount(coin.amount, DECIMAL); })
                        .reduce(function (acc, cur) { return xchainUtil.baseAmount(acc.amount().plus(cur.amount()), DECIMAL); }, xchainUtil.baseAmount(0, DECIMAL));
                    var to_index = -1;
                    to.forEach(function (value, index) {
                        if (value.to === output.address)
                            to_index = index;
                    });
                    if (to_index === -1) {
                        to.push({
                            to: output.address,
                            amount: amount,
                        });
                    }
                    else {
                        to[to_index].amount = xchainUtil.baseAmount(to[to_index].amount.amount().plus(amount.amount()), DECIMAL);
                    }
                });
            }
        });
        return __spreadArray(__spreadArray([], acc), [
            {
                asset: AssetRune,
                from: from,
                to: to,
                date: new Date(tx.timestamp),
                type: from.length > 0 || to.length > 0 ? 'transfer' : 'unknown',
                hash: tx.txhash || '',
            },
        ]);
    }, []);
};
/**
 * Get the default fee.
 *
 * @returns {Fees} The default fee.
 */
var getDefaultFees = function () {
    var fee = xchainUtil.baseAmount(DEFAULT_GAS_VALUE, DECIMAL);
    return {
        type: 'base',
        fast: fee,
        fastest: fee,
        average: fee,
    };
};
/**
 * Get transaction type.
 *
 * @param {string} txData the transaction input data
 * @param {string} encoding `base64` or `hex`
 * @returns {string} the transaction type.
 */
var getTxType = function (txData, encoding) {
    return Buffer.from(txData, encoding).toString().slice(4);
};
/**
 * Get the client url.
 *
 * @returns {ClientUrl} The client url (both mainnet and testnet) for thorchain.
 */
var getDefaultClientUrl = function () {
    return {
        testnet: {
            node: 'https://testnet.thornode.thorchain.info',
            rpc: 'https://testnet.rpc.thorchain.info',
        },
        mainnet: {
            node: 'https://thornode.thorchain.info',
            rpc: 'https://rpc.thorchain.info',
        },
    };
};
var DEFAULT_EXPLORER_URL = 'https://viewblock.io/thorchain';
/**
 * Get default explorer urls.
 *
 * @returns {ExplorerUrls} Default explorer urls (both mainnet and testnet) for thorchain.
 */
var getDefaultExplorerUrls = function () {
    var root = {
        testnet: DEFAULT_EXPLORER_URL + "?network=testnet",
        mainnet: DEFAULT_EXPLORER_URL,
    };
    var txUrl = DEFAULT_EXPLORER_URL + "/tx";
    var tx = {
        testnet: txUrl,
        mainnet: txUrl,
    };
    var addressUrl = DEFAULT_EXPLORER_URL + "/address";
    var address = {
        testnet: addressUrl,
        mainnet: addressUrl,
    };
    return {
        root: root,
        tx: tx,
        address: address,
    };
};
/**
 * Get the explorer url.
 *
 * @param {Network} network
 * @param {ExplorerUrls} Explorer urls
 * @returns {string} The explorer url for thorchain based on the given network.
 */
var getExplorerUrl = function (_a, network) {
    var root = _a.root;
    return root[network];
};
/**
 * Get explorer address url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {Address} address
 * @returns {string} The explorer url for the given address.
 */
var getExplorerAddressUrl = function (_a) {
    var urls = _a.urls, network = _a.network, address = _a.address;
    var url = urls.address[network] + "/" + address;
    return network === 'mainnet' ? url : url + "?network=testnet";
};
/**
 * Get transaction url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {TxHash} txID
 * @returns {string} The explorer url for the given transaction id.
 */
var getExplorerTxUrl = function (_a) {
    var urls = _a.urls, network = _a.network, txID = _a.txID;
    var url = urls.tx[network] + "/" + txID;
    return network === 'mainnet' ? url : url + "?network=testnet";
};

/**
 * Custom Thorchain Client
 */
var Client = /** @class */ (function () {
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
    function Client(_a) {
        var _this = this;
        var _b = _a.network, network = _b === void 0 ? 'testnet' : _b, phrase = _a.phrase, clientUrl = _a.clientUrl, explorerUrls = _a.explorerUrls, _c = _a.rootDerivationPaths, rootDerivationPaths = _c === void 0 ? {
            mainnet: "44'/931'/0'/0/",
            testnet: "44'/931'/0'/0/",
        } : _c;
        this.phrase = '';
        /**
         * Purge client.
         *
         * @returns {void}
         */
        this.purgeClient = function () {
            _this.phrase = '';
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
            _this.network = network;
            _this.cosmosClient.updatePrefix(getPrefix(_this.network));
        };
        /**
         * Get the current network.
         *
         * @returns {Network} The current network. (`mainnet` or `testnet`)
         */
        this.getNetwork = function () {
            return _this.network;
        };
        /**
         * Set/update the client URL.
         *
         * @param {ClientUrl} clientUrl The client url to be set.
         * @returns {void}
         */
        this.setClientUrl = function (clientUrl) {
            _this.clientUrl = clientUrl;
        };
        /**
         * Get the client url.
         *
         * @returns {NodeUrl} The client url for thorchain based on the current network.
         */
        this.getClientUrl = function () { return _this.clientUrl[_this.network]; };
        /**
         * Set/update the explorer URLs.
         *
         * @param {ExplorerUrls} urls The explorer urls to be set.
         * @returns {void}
         */
        this.setExplorerUrls = function (urls) {
            _this.explorerUrls = urls;
        };
        /**
         * Get the explorer url.
         *
         * @returns {string} The explorer url for thorchain based on the current network.
         */
        this.getExplorerUrl = function () {
            return _this.explorerUrls.root[_this.network];
        };
        /**
         * Get cosmos client
         * @returns {CosmosSDKClient} current cosmos client
         */
        this.getCosmosClient = function () { return _this.cosmosClient; };
        /**
         * Get the chain id.
         *
         * @returns {string} The chain id based on the network.
         */
        this.getChainId = function () {
            return 'thorchain';
        };
        /**
         * Get the explorer url for the given address.
         *
         * @param {Address} address
         * @returns {string} The explorer url for the given address.
         */
        this.getExplorerAddressUrl = function (address) {
            return getExplorerAddressUrl({ urls: _this.explorerUrls, network: _this.network, address: address });
        };
        /**
         * Get the explorer url for the given transaction id.
         *
         * @param {string} txID
         * @returns {string} The explorer url for the given transaction id.
         */
        this.getExplorerTxUrl = function (txID) {
            return getExplorerTxUrl({ urls: _this.explorerUrls, network: _this.network, txID: txID });
        };
        /**
         * Set/update a new phrase
         *
         * @param {string} phrase A new phrase.
         * @returns {Address} The address from the given phrase
         *
         * @throws {"Invalid phrase"}
         * Thrown if the given phase is invalid.
         */
        this.setPhrase = function (phrase, walletIndex) {
            if (walletIndex === void 0) { walletIndex = 0; }
            if (_this.phrase !== phrase) {
                if (!xchainCrypto.validatePhrase(phrase)) {
                    throw new Error('Invalid phrase');
                }
                _this.phrase = phrase;
            }
            return _this.getAddress(walletIndex);
        };
        /**
         * @private
         * Get private key.
         *
         * @returns {PrivKey} The private key generated from the given phrase
         *
         * @throws {"Phrase not set"}
         * Throws an error if phrase has not been set before
         * */
        this.getPrivateKey = function (index) {
            if (index === void 0) { index = 0; }
            return _this.cosmosClient.getPrivKeyFromMnemonic(_this.phrase, _this.getFullDerivationPath(index));
        };
        /**
         * Get the current address.
         *
         * @returns {Address} The current address.
         *
         * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
         */
        this.getAddress = function (index) {
            if (index === void 0) { index = 0; }
            var address = _this.cosmosClient.getAddressFromMnemonic(_this.phrase, _this.getFullDerivationPath(index));
            if (!address) {
                throw new Error('address not defined');
            }
            return address;
        };
        /**
         * Validate the given address.
         *
         * @param {Address} address
         * @returns {boolean} `true` or `false`
         */
        this.validateAddress = function (address) {
            return _this.cosmosClient.checkAddress(address);
        };
        /**
         * Get the balance of a given address.
         *
         * @param {Address} address By default, it will return the balance of the current wallet. (optional)
         * @param {Asset} asset If not set, it will return all assets available. (optional)
         * @returns {Array<Balance>} The balance of the address.
         */
        this.getBalance = function (address, assets) { return __awaiter(_this, void 0, void 0, function () {
            var balances, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cosmosClient.getBalance(address)];
                    case 1:
                        balances = _a.sent();
                        return [2 /*return*/, balances
                                .map(function (balance) { return ({
                                asset: (balance.denom && getAsset(balance.denom)) || AssetRune,
                                amount: xchainUtil.baseAmount(balance.amount, DECIMAL),
                            }); })
                                .filter(function (balance) {
                                return !assets || assets.filter(function (asset) { return xchainUtil.assetToString(balance.asset) === xchainUtil.assetToString(asset); }).length;
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
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
            var messageAction, offset, limit, txMinHeight, txMaxHeight, txIncomingHistory, txOutgoingHistory, history_2, total, txs, _i, history_1, tx, _a, _b, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messageAction = undefined;
                        offset = (params === null || params === void 0 ? void 0 : params.offset) || 0;
                        limit = (params === null || params === void 0 ? void 0 : params.limit) || 10;
                        txMinHeight = undefined;
                        txMaxHeight = undefined;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        registerCodecs(this.network);
                        return [4 /*yield*/, this.cosmosClient.searchTxFromRPC({
                                rpcEndpoint: this.getClientUrl().rpc,
                                messageAction: messageAction,
                                transferRecipient: params === null || params === void 0 ? void 0 : params.address,
                                limit: MAX_TX_COUNT,
                                txMinHeight: txMinHeight,
                                txMaxHeight: txMaxHeight,
                            })];
                    case 2:
                        txIncomingHistory = (_c.sent()).txs;
                        return [4 /*yield*/, this.cosmosClient.searchTxFromRPC({
                                rpcEndpoint: this.getClientUrl().rpc,
                                messageAction: messageAction,
                                transferSender: params === null || params === void 0 ? void 0 : params.address,
                                limit: MAX_TX_COUNT,
                                txMinHeight: txMinHeight,
                                txMaxHeight: txMaxHeight,
                            })];
                    case 3:
                        txOutgoingHistory = (_c.sent()).txs;
                        history_2 = __spreadArray(__spreadArray([], txIncomingHistory), txOutgoingHistory).sort(function (a, b) {
                            if (a.height !== b.height)
                                return parseInt(b.height) > parseInt(a.height) ? 1 : -1;
                            if (a.hash !== b.hash)
                                return a.hash > b.hash ? 1 : -1;
                            return 0;
                        })
                            .reduce(function (acc, tx) { return __spreadArray(__spreadArray([], acc), (acc.length === 0 || acc[acc.length - 1].hash !== tx.hash ? [tx] : [])); }, [])
                            .filter((params === null || params === void 0 ? void 0 : params.filterFn)
                            ? params.filterFn
                            : function (tx) {
                                var action = getTxType(tx.tx_result.data, 'base64');
                                return action === MSG_DEPOSIT || action === MSG_SEND;
                            })
                            .filter(function (_, index) { return index < MAX_TX_COUNT; });
                        total = history_2.length;
                        history_2 = history_2.filter(function (_, index) { return index >= offset && index < offset + limit; });
                        txs = [];
                        _i = 0, history_1 = history_2;
                        _c.label = 4;
                    case 4:
                        if (!(_i < history_1.length)) return [3 /*break*/, 7];
                        tx = history_1[_i];
                        _b = (_a = txs).push;
                        return [4 /*yield*/, this.getTransactionData(tx.hash)];
                    case 5:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, {
                            total: total,
                            txs: txs,
                        }];
                    case 8:
                        error_2 = _c.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the transaction details of a given transaction id.
         *
         * @param {string} txId The transaction id.
         * @returns {Tx} The transaction details of the given transaction id.
         */
        this.getTransactionData = function (txId) { return __awaiter(_this, void 0, void 0, function () {
            var txResult, action, txs, _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.cosmosClient.txsHashGet(txId)];
                    case 1:
                        txResult = _b.sent();
                        action = getTxType(txResult.data, 'hex');
                        txs = [];
                        if (!(action === MSG_DEPOSIT)) return [3 /*break*/, 3];
                        _a = [{}];
                        return [4 /*yield*/, this.getDepositTransaction(txId)];
                    case 2:
                        txs = [
                            __assign.apply(void 0, [__assign.apply(void 0, _a.concat([(_b.sent())])), { date: new Date(txResult.timestamp) }])
                        ];
                        return [3 /*break*/, 4];
                    case 3:
                        txs = getTxsFromHistory([txResult], this.network);
                        _b.label = 4;
                    case 4:
                        if (txs.length === 0) {
                            throw new Error('transaction not found');
                        }
                        return [2 /*return*/, txs[0]];
                    case 5:
                        error_3 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the transaction details of a given transaction id. (from /thorchain/txs/hash)
         *
         * Node: /thorchain/txs/hash response doesn't have timestamp field.
         *
         * @param {string} txId The transaction id.
         * @returns {Tx} The transaction details of the given transaction id.
         */
        this.getDepositTransaction = function (txId) { return __awaiter(_this, void 0, void 0, function () {
            var result_1, from_1, to_1, asset_1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios__default['default']
                                .get(this.getClientUrl().node + "/thorchain/tx/" + txId)
                                .then(function (response) { return response.data; })];
                    case 1:
                        result_1 = _a.sent();
                        if (!result_1 || !result_1.observed_tx) {
                            throw new Error('transaction not found');
                        }
                        from_1 = [];
                        to_1 = [];
                        result_1.observed_tx.tx.coins.forEach(function (coin) {
                            from_1.push({
                                from: result_1.observed_tx.tx.from_address,
                                amount: xchainUtil.baseAmount(coin.amount, DECIMAL),
                            });
                            to_1.push({
                                to: result_1.observed_tx.tx.to_address,
                                amount: xchainUtil.baseAmount(coin.amount, DECIMAL),
                            });
                            asset_1 = xchainUtil.assetFromString(coin.asset);
                        });
                        return [2 /*return*/, {
                                asset: asset_1 || AssetRune,
                                from: from_1,
                                to: to_1,
                                type: 'transfer',
                                hash: txId,
                            }];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Structure StdTx from MsgNativeTx.
         *
         * @param {string} txId The transaction id.
         * @returns {Tx} The transaction details of the given transaction id.
         *
         * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
         */
        this.buildDepositTx = function (msgNativeTx) { return __awaiter(_this, void 0, void 0, function () {
            var response, unsignedStdTx, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios__default['default']
                                .post(this.getClientUrl().node + "/thorchain/deposit", {
                                coins: msgNativeTx.coins,
                                memo: msgNativeTx.memo,
                                base_req: {
                                    chain_id: 'thorchain',
                                    from: msgNativeTx.signer,
                                },
                            })
                                .then(function (response) { return response.data; })];
                    case 1:
                        response = _a.sent();
                        if (!response || !response.value) {
                            throw new Error('Invalid client url');
                        }
                        unsignedStdTx = auth.StdTx.fromJSON({
                            msg: response.value.msg,
                            fee: response.value.fee,
                            signatures: [],
                            memo: '',
                        });
                        return [2 /*return*/, unsignedStdTx];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(new Error('Invalid client url'))];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Transaction with MsgNativeTx.
         *
         * @param {DepositParam} params The transaction options.
         * @returns {TxHash} The transaction hash.
         *
         * @throws {"insufficient funds"} Thrown if the wallet has insufficient funds.
         * @throws {"failed to broadcast transaction"} Thrown if failed to broadcast transaction.
         */
        this.deposit = function (_a) {
            var _b = _a.walletIndex, walletIndex = _b === void 0 ? 0 : _b, _c = _a.asset, asset = _c === void 0 ? AssetRune : _c, amount = _a.amount, memo = _a.memo;
            return __awaiter(_this, void 0, void 0, function () {
                var assetBalance, signer, msgNativeTx, unsignedStdTx, privateKey, accAddress, fee, error_6;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.getBalance(this.getAddress(walletIndex), [asset])];
                        case 1:
                            assetBalance = _d.sent();
                            if (assetBalance.length === 0 || assetBalance[0].amount.amount().lt(amount.amount().plus(DEFAULT_GAS_VALUE))) {
                                throw new Error('insufficient funds');
                            }
                            signer = this.getAddress(walletIndex);
                            msgNativeTx = msgNativeTxFromJson({
                                coins: [
                                    {
                                        asset: getDenomWithChain(asset),
                                        amount: amount.amount().toString(),
                                    },
                                ],
                                memo: memo,
                                signer: signer,
                            });
                            return [4 /*yield*/, this.buildDepositTx(msgNativeTx)];
                        case 2:
                            unsignedStdTx = _d.sent();
                            privateKey = this.getPrivateKey(walletIndex);
                            accAddress = cosmosClient.AccAddress.fromBech32(signer);
                            fee = unsignedStdTx.fee;
                            // max. gas
                            fee.gas = '10000000';
                            return [2 /*return*/, this.cosmosClient
                                    .signAndBroadcast(unsignedStdTx, privateKey, accAddress)
                                    .then(function (result) { var _a; return (_a = result === null || result === void 0 ? void 0 : result.txhash) !== null && _a !== void 0 ? _a : ''; })];
                        case 3:
                            error_6 = _d.sent();
                            return [2 /*return*/, Promise.reject(error_6)];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Transfer balances with MsgSend
         *
         * @param {TxParams} params The transfer options.
         * @returns {TxHash} The transaction hash.
         */
        this.transfer = function (_a) {
            var _b = _a.walletIndex, walletIndex = _b === void 0 ? 0 : _b, _c = _a.asset, asset = _c === void 0 ? AssetRune : _c, amount = _a.amount, recipient = _a.recipient, memo = _a.memo;
            return __awaiter(_this, void 0, void 0, function () {
                var assetBalance, fee, transferResult, error_7;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 4, , 5]);
                            registerCodecs(this.network);
                            return [4 /*yield*/, this.getBalance(this.getAddress(walletIndex), [asset])];
                        case 1:
                            assetBalance = _d.sent();
                            return [4 /*yield*/, this.getFees()];
                        case 2:
                            fee = _d.sent();
                            if (assetBalance.length === 0 || assetBalance[0].amount.amount().lt(amount.amount().plus(fee.average.amount()))) {
                                throw new Error('insufficient funds');
                            }
                            return [4 /*yield*/, this.cosmosClient.transfer({
                                    privkey: this.getPrivateKey(walletIndex),
                                    from: this.getAddress(walletIndex),
                                    to: recipient,
                                    amount: amount.amount().toString(),
                                    asset: getDenom(asset),
                                    memo: memo,
                                    fee: {
                                        amount: [],
                                        gas: DEFAULT_GAS_VALUE,
                                    },
                                })];
                        case 3:
                            transferResult = _d.sent();
                            if (!isBroadcastSuccess(transferResult)) {
                                throw new Error("failed to broadcast transaction: " + transferResult.txhash);
                            }
                            return [2 /*return*/, (transferResult === null || transferResult === void 0 ? void 0 : transferResult.txhash) || ''];
                        case 4:
                            error_7 = _d.sent();
                            return [2 /*return*/, Promise.reject(error_7)];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get the fees.
         *
         * @returns {Fees}
         */
        this.getFees = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(getDefaultFees())];
            });
        }); };
        this.network = network;
        this.clientUrl = clientUrl || getDefaultClientUrl();
        this.explorerUrls = explorerUrls || getDefaultExplorerUrls();
        this.rootDerivationPaths = rootDerivationPaths;
        this.cosmosClient = new xchainCosmos.CosmosSDKClient({
            server: this.getClientUrl().node,
            chainId: this.getChainId(),
            prefix: getPrefix(this.network),
        });
        if (phrase)
            this.setPhrase(phrase);
    }
    /**
     * Get getFullDerivationPath
     *
     * @param {number} index the HD wallet index
     * @returns {string} The bitcoin derivation path based on the network.
     */
    Client.prototype.getFullDerivationPath = function (index) {
        return this.rootDerivationPaths[this.network] + ("" + index);
    };
    return Client;
}());

exports.AssetRune = AssetRune;
exports.Client = Client;
exports.DECIMAL = DECIMAL;
exports.DEFAULT_GAS_VALUE = DEFAULT_GAS_VALUE;
exports.MAX_TX_COUNT = MAX_TX_COUNT;
exports.MSG_DEPOSIT = MSG_DEPOSIT;
exports.MSG_SEND = MSG_SEND;
exports.MsgNativeTx = MsgNativeTx;
exports.THORChain = THORChain;
exports.getAsset = getAsset;
exports.getDefaultClientUrl = getDefaultClientUrl;
exports.getDefaultExplorerUrls = getDefaultExplorerUrls;
exports.getDefaultFees = getDefaultFees;
exports.getDenom = getDenom;
exports.getDenomWithChain = getDenomWithChain;
exports.getExplorerAddressUrl = getExplorerAddressUrl;
exports.getExplorerTxUrl = getExplorerTxUrl;
exports.getExplorerUrl = getExplorerUrl;
exports.getPrefix = getPrefix;
exports.getTxType = getTxType;
exports.getTxsFromHistory = getTxsFromHistory;
exports.isBroadcastSuccess = isBroadcastSuccess;
exports.isMsgMultiSend = isMsgMultiSend;
exports.isMsgSend = isMsgSend;
exports.msgNativeTxFromJson = msgNativeTxFromJson;
exports.registerCodecs = registerCodecs;

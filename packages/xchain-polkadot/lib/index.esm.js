import axios from 'axios';
import { assetToBase, assetAmount, assetToString, baseAmount } from '@xchainjs/xchain-util';
import { validatePhrase } from '@xchainjs/xchain-crypto';
import { Keyring, ApiPromise, WsProvider } from '@polkadot/api';
import { isHex, hexToU8a } from '@polkadot/util';

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

var Polkadot = 'THOR';
var AssetDOT = { chain: Polkadot, symbol: 'DOT', ticker: 'DOT' };

/**
 * Check Subscan API response
 *
 * @param {SubscanResponse} response The subscan response.
 * @returns {boolean} `true` or `false`
 */
var isSuccess = function (response) { return !response.code; };
/**
 * Get the decimal based on the network
 *
 * @param {Network} network The network.
 * @returns {number} The decimal based on the network.
 */
var getDecimal = function (network) {
    return network === 'testnet' ? 12 : 10;
};
/**
 * Get the default fees.
 *
 * @returns {Fees} The default fees based on the network.
 */
var getDefaultFees = function (network) {
    var fee = assetToBase(assetAmount(0.015, getDecimal(network)));
    return {
        type: 'byte',
        fast: fee,
        fastest: fee,
        average: fee,
    };
};
/**
 * Get address prefix based on the network.
 *
 * @param {string} network
 * @returns {string} The address prefix based on the network.
 *
 **/
var getPrefix = function (network) { return (network === 'testnet' ? '5' : '1'); };

/**
 * Custom Polkadot client
 */
var Client = /** @class */ (function () {
    /**
     * Constructor
     * Client is initialised with network type and phrase (optional)
     *
     * @param {XChainClientParams} params
     */
    function Client(_a) {
        var _this = this;
        var _b = _a.network, network = _b === void 0 ? 'testnet' : _b, phrase = _a.phrase, _c = _a.rootDerivationPaths, rootDerivationPaths = _c === void 0 ? {
            mainnet: "44//354//0//0//0'",
            testnet: "44//354//0//0//0'",
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
         * Get the client url.
         *
         * @returns {string} The client url based on the network.
         */
        this.getClientUrl = function () {
            return _this.network === 'testnet' ? 'https://westend.subscan.io' : 'https://polkadot.subscan.io';
        };
        /**
         * Get the client WebSocket url.
         *
         * @returns {string} The client WebSocket url based on the network.
         */
        this.getWsEndpoint = function () {
            return _this.network === 'testnet' ? 'wss://westend-rpc.polkadot.io' : 'wss://rpc.polkadot.io';
        };
        /**
         * Get the explorer url.
         *
         * @returns {string} The explorer url based on the network.
         */
        this.getExplorerUrl = function () {
            return _this.network === 'testnet' ? 'https://westend.subscan.io' : 'https://polkadot.subscan.io';
        };
        /**
         * Get the explorer url for the given address.
         *
         * @param {Address} address
         * @returns {string} The explorer url for the given address based on the network.
         */
        this.getExplorerAddressUrl = function (address) {
            return _this.getExplorerUrl() + "/account/" + address;
        };
        /**
         * Get the explorer url for the given transaction id.
         *
         * @param {string} txID The transaction id
         * @returns {string} The explorer url for the given transaction id based on the network.
         */
        this.getExplorerTxUrl = function (txID) {
            return _this.getExplorerUrl() + "/extrinsic/" + txID;
        };
        /**
         * Get the SS58 format to be used for Polkadot Keyring.
         *
         * @returns {number} The SS58 format based on the network.
         */
        this.getSS58Format = function () {
            return _this.network === 'testnet' ? 42 : 0;
        };
        /**
         * Set/update a new phrase.
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
                if (!validatePhrase(phrase)) {
                    throw new Error('Invalid phrase');
                }
                _this.phrase = phrase;
            }
            return _this.getAddress(walletIndex);
        };
        /**
         * @private
         * Private function to get Keyring pair for polkadotjs provider.
         * @see https://polkadot.js.org/docs/api/start/keyring/#creating-a-keyring-instance
         *
         * @returns {KeyringPair} The keyring pair to be used to generate wallet address.
         * */
        this.getKeyringPair = function (index) {
            var key = new Keyring({ ss58Format: _this.getSS58Format(), type: 'ed25519' });
            return key.createFromUri(_this.phrase + "//" + _this.getFullDerivationPath(index));
        };
        /**
         * @private
         * Private function to get the polkadotjs API provider.
         *
         * @see https://polkadot.js.org/docs/api/start/create#api-instance
         *
         * @returns {ApiPromise} The polkadotjs API provider based on the network.
         * */
        this.getAPI = function () { return __awaiter(_this, void 0, void 0, function () {
            var api, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        api = new ApiPromise({ provider: new WsProvider(this.getWsEndpoint()) });
                        return [4 /*yield*/, api.isReady];
                    case 1:
                        _a.sent();
                        if (!!api.isConnected) return [3 /*break*/, 3];
                        return [4 /*yield*/, api.connect()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, api];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Validate the given address.
         * @see https://polkadot.js.org/docs/util-crypto/examples/validate-address
         *
         * @param {Address} address
         * @returns {boolean} `true` or `false`
         */
        this.validateAddress = function (address) {
            try {
                var key = new Keyring({ ss58Format: _this.getSS58Format(), type: 'ed25519' });
                return key.encodeAddress(isHex(address) ? hexToU8a(address) : key.decodeAddress(address)) === address;
            }
            catch (error) {
                return false;
            }
        };
        /**
         * Get the current address.
         *
         * Generates a network-specific key-pair by first converting the buffer to a Wallet-Import-Format (WIF)
         * The address is then decoded into type P2WPKH and returned.
         *
         * @returns {Address} The current address.
         *
         * @throws {"Address not defined"} Thrown if failed creating account from phrase.
         */
        this.getAddress = function (index) {
            if (index === void 0) { index = 0; }
            return _this.getKeyringPair(index).address;
        };
        /**
         * Get the DOT balance of a given address.
         *
         * @param {Address} address By default, it will return the balance of the current wallet. (optional)
         * @returns {Array<Balance>} The DOT balance of the address.
         */
        this.getBalance = function (address, assets) { return __awaiter(_this, void 0, void 0, function () {
            var response, account, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios
                                .post(this.getClientUrl() + "/api/open/account", { address: address || this.getAddress() })
                                .then(function (res) { return res.data; })];
                    case 1:
                        response = _a.sent();
                        if (!isSuccess(response)) {
                            throw new Error('Invalid address');
                        }
                        account = response.data;
                        return [2 /*return*/, account && (!assets || assets.filter(function (asset) { return assetToString(AssetDOT) === assetToString(asset); }).length)
                                ? [
                                    {
                                        asset: AssetDOT,
                                        amount: assetToBase(assetAmount(account.balance, getDecimal(this.network))),
                                    },
                                ]
                                : []];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
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
            var limit, offset, response, transferResult, error_3;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        limit = (_a = params === null || params === void 0 ? void 0 : params.limit) !== null && _a !== void 0 ? _a : 10;
                        offset = (_b = params === null || params === void 0 ? void 0 : params.offset) !== null && _b !== void 0 ? _b : 0;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios
                                .post(this.getClientUrl() + "/api/scan/transfers", {
                                address: params === null || params === void 0 ? void 0 : params.address,
                                row: limit,
                                page: offset,
                            })
                                .then(function (res) { return res.data; })];
                    case 2:
                        response = _c.sent();
                        if (!isSuccess(response) || !response.data) {
                            throw new Error('Failed to get transactions');
                        }
                        transferResult = response.data;
                        return [2 /*return*/, {
                                total: transferResult.count,
                                txs: (transferResult.transfers || []).map(function (transfer) { return ({
                                    asset: AssetDOT,
                                    from: [
                                        {
                                            from: transfer.from,
                                            amount: assetToBase(assetAmount(transfer.amount, getDecimal(_this.network))),
                                        },
                                    ],
                                    to: [
                                        {
                                            to: transfer.to,
                                            amount: assetToBase(assetAmount(transfer.amount, getDecimal(_this.network))),
                                        },
                                    ],
                                    date: new Date(transfer.block_timestamp * 1000),
                                    type: 'transfer',
                                    hash: transfer.hash,
                                }); }),
                            }];
                    case 3:
                        error_3 = _c.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 4: return [2 /*return*/];
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
            var response, extrinsic, transfer, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios
                                .post(this.getClientUrl() + "/api/scan/extrinsic", {
                                hash: txId,
                            })
                                .then(function (res) { return res.data; })];
                    case 1:
                        response = _a.sent();
                        if (!isSuccess(response) || !response.data) {
                            throw new Error('Failed to get transactions');
                        }
                        extrinsic = response.data;
                        transfer = extrinsic.transfer;
                        return [2 /*return*/, {
                                asset: AssetDOT,
                                from: [
                                    {
                                        from: transfer.from,
                                        amount: assetToBase(assetAmount(transfer.amount, getDecimal(this.network))),
                                    },
                                ],
                                to: [
                                    {
                                        to: transfer.to,
                                        amount: assetToBase(assetAmount(transfer.amount, getDecimal(this.network))),
                                    },
                                ],
                                date: new Date(extrinsic.block_timestamp * 1000),
                                type: 'transfer',
                                hash: extrinsic.extrinsic_hash,
                            }];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Transfer DOT.
         *
         * @param {TxParams} params The transfer options.
         * @returns {TxHash} The transaction hash.
         */
        this.transfer = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var api, transaction, walletIndex, transfer, remark, paymentInfo, fee, balances, txHash, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getAPI()];
                    case 1:
                        api = _a.sent();
                        transaction = null;
                        walletIndex = params.walletIndex || 0;
                        transfer = api.tx.balances.transfer(params.recipient, params.amount.amount().toString());
                        if (!params.memo) {
                            // Send a simple transfer
                            transaction = transfer;
                        }
                        else {
                            remark = api.tx.system.remark(params.memo);
                            // Send the Batch Transaction
                            transaction = api.tx.utility.batch([transfer, remark]);
                        }
                        return [4 /*yield*/, transaction.paymentInfo(this.getKeyringPair(walletIndex))];
                    case 2:
                        paymentInfo = _a.sent();
                        fee = baseAmount(paymentInfo.partialFee.toString(), getDecimal(this.network));
                        return [4 /*yield*/, this.getBalance(this.getAddress(walletIndex), [AssetDOT])];
                    case 3:
                        balances = _a.sent();
                        if (!balances || params.amount.amount().plus(fee.amount()).isGreaterThan(balances[0].amount.amount())) {
                            throw new Error('insufficient balance');
                        }
                        return [4 /*yield*/, transaction.signAndSend(this.getKeyringPair(walletIndex))];
                    case 4:
                        txHash = _a.sent();
                        return [4 /*yield*/, api.disconnect()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, txHash.toString()];
                    case 6:
                        error_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_5)];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the current fee with transfer options.
         *
         * @see https://polkadot.js.org/docs/api/cookbook/tx/#how-do-i-estimate-the-transaction-fees
         *
         * @param {TxParams} params The transfer options.
         * @returns {Fees} The estimated fees with the transfer options.
         */
        this.estimateFees = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var walletIndex, api, info, fee, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        walletIndex = params.walletIndex ? params.walletIndex : 0;
                        return [4 /*yield*/, this.getAPI()];
                    case 1:
                        api = _a.sent();
                        return [4 /*yield*/, api.tx.balances
                                .transfer(params.recipient, params.amount.amount().toNumber())
                                .paymentInfo(this.getKeyringPair(walletIndex))];
                    case 2:
                        info = _a.sent();
                        fee = baseAmount(info.partialFee.toString(), getDecimal(this.network));
                        return [4 /*yield*/, api.disconnect()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                type: 'byte',
                                average: fee,
                                fast: fee,
                                fastest: fee,
                            }];
                    case 4:
                        error_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_6)];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Get the current fee.
         *
         * @returns {Fees} The current fee.
         */
        this.getFees = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.estimateFees({
                            recipient: this.getAddress(),
                            amount: baseAmount(0, getDecimal(this.network)),
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.network = network;
        this.rootDerivationPaths = rootDerivationPaths;
        if (phrase)
            this.setPhrase(phrase);
    }
    /**
     * Get getFullDerivationPath
     *
     * @param {number} index the HD wallet index
     * @returns {string} The polkadot derivation path based on the network.
     */
    Client.prototype.getFullDerivationPath = function (index) {
        if (index === void 0) { index = 0; }
        // console.log(this.rootDerivationPaths[this.network])
        if (index === 0) {
            // this should make the tests backwards compatible
            return this.rootDerivationPaths[this.network];
        }
        else {
            return this.rootDerivationPaths[this.network] + ("//" + index);
        }
    };
    /**
     * Set/update the current network.
     *
     * @param {Network} network `mainnet` or `testnet`.
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    Client.prototype.setNetwork = function (network) {
        if (!network) {
            throw new Error('Network must be provided');
        }
        else {
            if (network !== this.network) {
                this.network = network;
            }
        }
    };
    /**
     * Get the current network.
     *
     * @returns {Network} The current network. (`mainnet` or `testnet`)
     */
    Client.prototype.getNetwork = function () {
        return this.network;
    };
    return Client;
}());

export { AssetDOT, Client, Polkadot, getDecimal, getDefaultFees, getPrefix, isSuccess };

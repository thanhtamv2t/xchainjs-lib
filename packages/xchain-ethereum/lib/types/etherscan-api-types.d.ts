export declare type GasOracleResponse = {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
};
export declare type TokenBalanceParam = {
    address: string;
    assetAddress: string;
};
export declare type TransactionHistoryParam = {
    address?: string;
    assetAddress?: string;
    page?: number;
    offset?: number;
    startblock?: number;
    endblock?: number;
};
export declare type TokenTransactionInfo = {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    value: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    input: string;
    confirmations: string;
};
export declare type ETHTransactionInfo = {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    contractAddress: string;
    input: string;
    type: string;
    gas: string;
    gasUsed: string;
    traceId: string;
    isError: string;
    errCode: string;
};

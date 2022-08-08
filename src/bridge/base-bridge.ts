import { TransactionResponse, TransactionStatus } from "fireblocks-sdk";
import { BridgeParams } from "../interfaces/bridge-params";
import { Chain } from "../interfaces/chain";

export const CHAIN_TO_ASSET_ID: {[key: string]: string } = {
    [Chain.MAINNET]: 'ETH',
    [Chain.ROPSTEN]: 'ETH_TEST',
    [Chain.GOERLI]: 'ETH_TEST3',
    [Chain.KOVAN]: 'ETH_TEST2',
    [Chain.BSC]: 'BNB_BSC',
    [Chain.BSC_TEST]: 'BNB_TEST',
    [Chain.POLYGON]: 'MATIC_POLYGON',
    [Chain.MUMBAI]: 'MATIC_POLYGON_MUMBAI',
    [Chain.RINKEBY]: 'ETH_TEST4',
}

export const CHAIN_IDS = {
    [Chain.MAINNET]: 1,
    [Chain.ROPSTEN]: 3,
    [Chain.RINKEBY]: 4,
    [Chain.GOERLI]: 5,
    [Chain.KOVAN]: 42,
    [Chain.BSC]: 56,
    [Chain.BSC_TEST]: 97,
    [Chain.POLYGON]: 137,
    [Chain.MUMBAI]: 80001,
}


export abstract class BaseBridge {
    readonly assetId: string;
    static readonly finalTransactionStates = [
        TransactionStatus.COMPLETED,
        TransactionStatus.FAILED,
        TransactionStatus.CANCELLED,
        TransactionStatus.BLOCKED,
        TransactionStatus.REJECTED
    ];
 
     constructor(readonly params: BridgeParams) {
         const chain = params.chain || Chain.MAINNET;
         this.assetId = CHAIN_TO_ASSET_ID[chain];
     }

     async getDepositAddress(): Promise<string> {
         const depositAddresses = await this.params.fireblocksApiClient.getDepositAddresses(this.params.vaultAccountId, this.assetId);
         return depositAddresses[0].address;
     }

     getChainId(): number {
         return CHAIN_IDS[this.params.chain];
     }

     async waitForTxHash(txId: string, timeoutMs?: number): Promise<string> {
         return Promise.race([
             (async () => {
                let status: TransactionStatus;
                let txInfo: TransactionResponse;
                while(!BaseBridge.finalTransactionStates.includes(status)) {
                    try {
                        txInfo = await this.params.fireblocksApiClient.getTransactionById(txId);
                        status = txInfo.status;
                    } catch (err) {
                        console.error(err);
                    }
                    if (txInfo.txHash) {
                        return txInfo.txHash;
                    }
                    await new Promise(r => setTimeout(r, 1000));
                };
                
                if(status != TransactionStatus.COMPLETED)
                {
                    throw `Transaction was not completed successfully. Final Status: ${status}`;
                }
                return txInfo.txHash;
            })(),
            new Promise<string>((resolve, reject) => {
                if(timeoutMs) {
                    setTimeout(() => reject(`waitForTxCompletion() for txId ${txId} timed out`), timeoutMs)
                }
            })
        ]);
     }
}

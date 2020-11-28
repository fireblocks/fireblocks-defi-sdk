import { TransactionStatus } from "fireblocks-sdk";
import { BridgeParams } from "../interfaces/bridge-params";
import { Chain } from "../interfaces/chain";

const CHAIN_TO_ASSET_ID: {[key: string]: string } = {
    [Chain.MAINNET]: 'ETH',
    [Chain.ROPSTEN]: 'ETH_TEST',
    [Chain.KOVAN]: 'ETH_TEST2'
}

const CHAIN_IDS = {
    [Chain.MAINNET]: 1,
    [Chain.ROPSTEN]: 3,
    [Chain.KOVAN]: 42
}

export abstract class BaseBridge {
    readonly assetId: string;
 
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
                while (true) {
                    const txDetails = await this.params.fireblocksApiClient.getTransactionById(txId);

                    if ([TransactionStatus.BLOCKED, TransactionStatus.CANCELLED, TransactionStatus.FAILED].includes(txDetails.status)) {
                        throw `Transaction was not completed successfully. Final Status: ${txDetails.status}`;
                    }
    
                    if(txDetails.txHash) {
                        return txDetails.txHash;
                    }

                    await new Promise(r => setTimeout(r, 500));
                }
            })(),
            new Promise<string>((resolve, reject) => {
                if(timeoutMs) {
                    setTimeout(() => reject(`waitForTxCompletion() for txId ${txId} timed out`), timeoutMs)
                }
            })
        ]);
     }
}
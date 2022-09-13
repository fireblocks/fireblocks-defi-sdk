import { PeerType, TransactionOperation, CreateTransactionResponse, TransactionStatus, TransactionResponse } from "fireblocks-sdk";
import { BaseBridge } from "./base-bridge";
import * as BN from "bn.js";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { TypedDataUtils } from "eth-sig-util";

export interface TransactionConfig {
    from?: string | number;
    to?: string;
    value?: number | string | BN;
    gas?: number | string;
    gasPrice?: number | string | BN;
    data?: string;
    nonce?: number;
    chainId?: number;
    chain?: string;
    hardfork?: string;
}

export class Web3Bridge extends BaseBridge {
    async signTypedData(typedData, txNote) {
        const content = TypedDataUtils.sign(typedData).toString("hex");

        const transactionParams = {
            operation: TransactionOperation.RAW,
            assetId: this.assetId,
            source: {
                type: PeerType.VAULT_ACCOUNT,
                id: this.params.vaultAccountId
            },
            note: txNote || '',
            extraParameters: {
                rawMessageData: {
                    messages: [{
                        content
                    }]
                }
            }
        };
    
        const { id, status } = await this.params.fireblocksApiClient.createTransaction(transactionParams);

        let txInfo: TransactionResponse;
        let currentStatus: TransactionStatus = <TransactionStatus>status;

        while(!BaseBridge.finalTransactionStates.includes(currentStatus)) {
            try {
                txInfo = await this.params.fireblocksApiClient.getTransactionById(id);
                currentStatus = txInfo.status;    
            } catch (err) {
                console.log("error:" ,err);
            }
            await new Promise(r => setTimeout(r, 1000));
        }
        
        if(currentStatus != TransactionStatus.COMPLETED) {
            throw new Error(`Transaction was not completed successfully. Final Status: ${currentStatus}`);
        }

        
        const sig = txInfo.signedMessages[0].signature;
        const v = 27 + sig.v;
        return "0x" + sig.r + sig.s + v.toString(16);
    }

    async sendTransaction(transaction: TransactionConfig, txNote?: string): Promise<CreateTransactionResponse> {
        if (transaction.chainId && transaction.chainId != this.getChainId()) {
            throw new Error(`Chain ID of the transaction (${transaction.chainId}) does not match the chain ID of the connected account (${this.getChainId()})`);
        }

        return this.params.fireblocksApiClient.createTransaction({
            operation: TransactionOperation.CONTRACT_CALL,
            assetId: this.assetId,
            source: {
                type: PeerType.VAULT_ACCOUNT,
                id: this.params.vaultAccountId
            },
            destination: {
                type: this.params.externalWalletId ? PeerType.CONTRACT_WALLET : PeerType.ONE_TIME_ADDRESS,
                id: this.params.externalWalletId,
                oneTimeAddress: {
                    address: transaction.to
                }
            },
            note: txNote || '',
            amount: formatEther(transaction.value?.toString() || "0"),
            extraParameters: {
                contractCallData: transaction.data
            }
        });
    }
}



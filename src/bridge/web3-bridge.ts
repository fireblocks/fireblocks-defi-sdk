import { PeerType, TransactionOperation, CreateTransactionResponse, TransactionArguments } from "fireblocks-sdk";
import { BaseBridge } from "./base-bridge";
import * as BN from "bn.js";
import { formatEther, formatUnits } from "ethers/lib/utils";

interface TransactionConfig {
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
            gasPrice: transaction.gasPrice != undefined ? formatUnits(transaction.gasPrice.toString(), "gwei") : undefined,
            gasLimit: transaction.gas?.toString(),
            destination: {
                type: PeerType.EXTERNAL_WALLET,
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



import { Deferrable } from "@ethersproject/properties";
import { PeerType, TransactionOperation, CreateTransactionResponse, TransactionArguments } from "fireblocks-sdk";
import { PopulatedTransaction } from "ethers";
import { BaseBridge } from "./base-bridge";
import { formatEther, formatUnits } from "ethers/lib/utils";


export class EthersBridge extends BaseBridge {
    async sendTransaction(transaction: Deferrable<PopulatedTransaction>, txNote?: string): Promise<CreateTransactionResponse> {
        const txArguments: TransactionArguments = {
            operation: TransactionOperation.CONTRACT_CALL,
            assetId: this.assetId,
            source: {
                type: PeerType.VAULT_ACCOUNT,
                id: this.params.vaultAccountId
            },
            gasPrice: transaction.gasPrice != undefined ? formatUnits(transaction.gasPrice.toString(), "gwei") : undefined,
            gasLimit: transaction.gasLimit?.toString(),
            destination: {
                type: this.params.externalWalletId ? PeerType.EXTERNAL_WALLET : PeerType.ONE_TIME_ADDRESS,
                id: this.params.externalWalletId,
                oneTimeAddress: this.params.externalWalletId ? undefined : {
                    address: <string>transaction.to
                }
            },
            note: txNote || '',
            amount: formatEther(transaction.value?.toString() || "0"),
            extraParameters: {
                contractCallData: transaction.data
            }
        };
        return this.params.fireblocksApiClient.createTransaction(txArguments);
    }
}

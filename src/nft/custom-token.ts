import {BaseToken} from "./base-token";
import {BridgeParams} from "../interfaces/bridge-params";
import {CreateTransactionResponse} from "fireblocks-sdk";
import {ABIStructure} from "../types/abi";

export class CustomToken extends BaseToken {

    constructor(bridgeParams: BridgeParams, contractABI: ABIStructure) {
        super(bridgeParams, contractABI);
    }


    callReadFunction(abiFunctionName: string, ...args): Promise<any> {
        return this.callView(abiFunctionName, ...args);
    }

    /**
     *
     * @param abiFunctionName
     * @param notes
     * @param args - arguments for contract call (addresses should be wrapped with Web3.toChecksumAddress(address)
     */
    async callWriteFunction(abiFunctionName: string, notes: string, ...args): Promise<CreateTransactionResponse> {
        const transactionData = await this.buildTransaction(abiFunctionName, ...args, notes);
        return this.submitTransaction(transactionData, notes);
    }

}
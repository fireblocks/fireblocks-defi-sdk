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

    callWriteFunction(abiFunctionName: string, notes: string, ...args): Promise<CreateTransactionResponse> {
        return this.submitTransaction(this.buildTransaction(abiFunctionName, ...args, notes), notes);
    }

}
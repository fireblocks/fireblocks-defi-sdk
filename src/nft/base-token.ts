import {BridgeParams} from "../interfaces/bridge-params";
import {ethers} from "ethers";
import {Web3Bridge} from "../bridge/web3-bridge";
import {CreateTransactionResponse} from "fireblocks-sdk";
import {ContractFunction} from "@ethersproject/contracts";
import {ABIStructure} from "../types/abi";

export class BaseToken {
    private readonly _allFunctions: { [key: string]: ContractFunction | any };
    private readonly bridgeParams: BridgeParams;
    private readonly contract: ethers.Contract;
    web3Bridge: Web3Bridge;
    contractABI: ABIStructure;

    constructor(bridgeParams: BridgeParams, contractABI: ABIStructure) {
        if (!bridgeParams.chain) {
            throw new Error('Token must contain chain');
        }
        this.bridgeParams = bridgeParams;
        this.web3Bridge = new Web3Bridge(this.bridgeParams);
        this.contractABI = contractABI
        this.contract = new ethers.Contract(this.bridgeParams.externalWalletId, JSON.stringify(this.contractABI), ethers.getDefaultProvider(this.bridgeParams.chain));
        this._allFunctions = this.contract.functions;
    }


    /**
     * Use this to build a transaction which will then be sent to fireblocks to get signed.
     * @param abiName - abi function name
     * @param args - function params
     */
    buildTransaction(abiName: string, ...args) {
        return this.contract.populateTransaction[abiName](...args);
    }

    /**
     * Use this to execute a function that needs no signing, e.g. supportsInterface. Basically a "read" function
     * @param abiName
     * @param args
     */
    callView(abiName: string, ...args): Promise<any> {
        return this.contract[abiName](...args);
    }


    /**
     * Submit transaction using defi SDK
     * @param transactionData
     * @param notes - (Optional) Add a note to the transaction
     */
    submitTransaction(transactionData, notes?: string): Promise<CreateTransactionResponse> {
        return this.web3Bridge.sendTransaction(transactionData, notes);
    }

}
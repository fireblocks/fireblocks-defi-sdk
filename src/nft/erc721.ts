import {BaseToken} from "./base-token";
import {ERC721_ABI} from "../constants/base-abis";
import {BridgeParams} from "../interfaces/bridge-params";
import {CreateTransactionResponse} from "fireblocks-sdk";
import {BigNumber} from "ethers";
import Web3 from "web3";

export class ERC721 extends BaseToken {

    constructor(bridgeParams: BridgeParams) {
        super(bridgeParams, ERC721_ABI);
    }

    /** Payable **/

    /**
     *
     * @param toAddress
     * @param tokenId
     * @param note
     */
    async approve(toAddress: string, tokenId: number, note: string = ""): Promise<CreateTransactionResponse> {
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress);
        const transactionData = await this.buildTransaction("approve", checkedToAddress, tokenId);
        return this.submitTransaction(transactionData, note)
    }

    /**
     *
     * @param fromAddress
     * @param toAddress
     * @param tokenId
     * @param data
     * @param note
     */
    async safeTransferFrom(toAddress: string, tokenId: number, data?: string, note: string = "", fromAddress?: string): Promise<CreateTransactionResponse> {
        let transactionData;
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress || await this.getAddress())
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress);
        if (data) {
            transactionData = await this.contract.populateTransaction['safeTransferFrom(address,address,uint256,bytes)'](checkedFromAddress,
                checkedToAddress,
                tokenId,
                data
            )
        } else {
            transactionData = await this.contract.populateTransaction["safeTransferFrom(address,address,uint256)"](checkedFromAddress, checkedToAddress, tokenId)
        }
        transactionData.from = checkedFromAddress;
        return this.submitTransaction(transactionData, note)
    }


    /**
     *
     * @param fromAddress
     * @param toAddress
     * @param tokenId
     * @param note
     */
    async transferFrom(toAddress: string, tokenId: number, note: string = "", fromAddress?: string): Promise<CreateTransactionResponse> {
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress || await this.getAddress())
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress);
        const transactionData = await this.buildTransaction("transferFrom", checkedFromAddress,
            checkedToAddress, tokenId);

        return this.submitTransaction(transactionData, note)
    }

    /**
     *
     * @param operatorAddress
     * @param isApproved
     * @param note
     */
    async setApprovalForAll(operatorAddress: string, isApproved: boolean, note: string = ""): Promise<CreateTransactionResponse> {
        const checkedOperatorAddress = Web3.utils.toChecksumAddress(operatorAddress)
        return this.submitTransaction(await this.buildTransaction("setApprovalForAll", checkedOperatorAddress, isApproved), note)
    }

    /** Views **/

    /**
     *
     * @param interfaceId
     */
    supportsInterface(interfaceId: string = '0x80ac58cd'): Promise<boolean> {
        return this.callView("supportsInterface", interfaceId)
    }

    /**
     *
     * @param tokenId
     */
    getApproved(tokenId: number): Promise<string> {
        return this.callView("getApproved", tokenId);
    }

    /**
     *
     * @param ownerAddress
     * @param operatorAddress
     */
    isApprovedForAll(ownerAddress: string, operatorAddress: string): Promise<boolean> {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress)
        const operatorCheckedAddress = Web3.utils.toChecksumAddress(operatorAddress)
        return this.callView("isApprovedForAll", ownerCheckedAddress, operatorCheckedAddress)
    }

    /**
     *
     * @param ownerAddress
     */
    async balanceOf(ownerAddress?: string): Promise<BigNumber> {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress || await this.getAddress())
        return this.callView("balanceOf", ownerCheckedAddress)
    }

    /**
     *
     * @param tokenId
     */
    ownerOf(tokenId: number): Promise<string> {
        return this.callView("ownerOf", tokenId);
    }


}
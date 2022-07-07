import {BaseToken} from "./base-token";
import {ERC721_ABI} from "../constants/base-abis";
import {BridgeParams} from "../interfaces/bridge-params";
import {CreateTransactionResponse} from "fireblocks-sdk";
import Web3 from 'web3';

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
    approve(toAddress: string, tokenId: number, note: string = ""): Promise<CreateTransactionResponse> {
        return this.submitTransaction(this.buildTransaction("approve", toAddress, tokenId), note)
    }

    /**
     *
     * @param fromAddress
     * @param toAddress
     * @param tokenId
     * @param data
     * @param note
     */
    safeTransferFrom(fromAddress: string, toAddress: string, tokenId: number, data: string = "", note: string = ""): Promise<CreateTransactionResponse> {
        if (data) {
            return this.submitTransaction(this.buildTransaction("safeTransferFrom",
                fromAddress,
                toAddress,
                tokenId,
                data
            ), note)
        }
        return this.submitTransaction(this.buildTransaction("safeTransferFrom", fromAddress, toAddress, tokenId), note)
    }


    /**
     *
     * @param fromAddress
     * @param toAddress
     * @param tokenId
     * @param note
     */
    transferFrom(fromAddress: string, toAddress: string, tokenId: number, note: string = "") {
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress)
        const checkedToAddress = Web3.utils.checkAddressChecksum(toAddress);
        return this.submitTransaction(this.buildTransaction("transferFrom", checkedFromAddress,
            checkedToAddress, tokenId), note)
    }

    /**
     *
     * @param operatorAddress
     * @param isApproved
     * @param note
     */
    setApprovalForAll(operatorAddress: string, isApproved: boolean, note: string = "") {
        const checkedOperatorAddress = Web3.utils.toChecksumAddress(operatorAddress)
        return this.submitTransaction(this.buildTransaction("setApprovalForAll", checkedOperatorAddress, isApproved), note)
    }

    /** Views **/

    /**
     *
     * @param interfaceId
     */
    supportsInterface(interfaceId: string = "0x80ac58cd"): boolean {
        return this.callView("supportsInterface", interfaceId)
    }

    /**
     *
     * @param tokenId
     */
    getApproved(tokenId: number): boolean {
        return this.callView("getApproved", tokenId);
    }

    /**
     *
     * @param ownerAddress
     * @param operatorAddress
     */
    isApprovedForAll(ownerAddress: string, operatorAddress: string): boolean {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress)
        const operatorCheckedAddress = Web3.utils.toChecksumAddress(operatorAddress)
        return this.callView("isApprovedForAll", ownerCheckedAddress, operatorCheckedAddress)
    }

    /**
     *
     * @param ownerAddress
     */
    balanceOf(ownerAddress: string): number {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress)
        return this.callView("balanceOf", ownerCheckedAddress)
    }

    /**
     *
     * @param tokenId
     */
    ownerOf(tokenId: number): string {
        return this.callView("ownerOf", tokenId);
    }

    /** Events **/

}
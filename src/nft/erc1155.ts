import {BaseToken} from "./base-token";
import {BridgeParams} from "../interfaces/bridge-params";
import {ERC1155_ABI} from "../constants/base-abis";
import Web3 from "web3";
import {CreateTransactionResponse} from "fireblocks-sdk";

export class ERC1155 extends BaseToken {

    constructor(bridgeParams: BridgeParams) {
        super(bridgeParams, ERC1155_ABI);
    }

    /** Payable **/

    /**
     * Length of token_ids and values must match. Moreover, the value of each token (at position x at [values]) to be
     * sent must match the same position at [token_ids] (position x). For example:
     * token_ids [3, 6, 10] and values [10, 20, 30] will send:
     *         - 10 tokens of token id 3
     *         - 20 tokens of token id 6
     *         - 30 tokens of token id 10
     * @param fromAddress - The sender of the address token.
     * @param toAddress - The receiver of the address token.
     * @param tokenIds - A list of token ids to transfer from sender to receiver.
     * @param values
     * @param data
     * @param note
     */
    async safeBatchTransferFrom(toAddress: string, tokenIds: number[], values: number[],
                                data: Uint8Array = null, note: string = "", fromAddress?: string): Promise<CreateTransactionResponse> {
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress || await this.getAddress())
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress)

        if (tokenIds?.length != values?.length) {
            throw new Error('Length of token_ids and values must match!');
        }
        console.log('safeBatchTransferFrom', checkedFromAddress, checkedToAddress, tokenIds, values, data || new Uint8Array());

        let transactionData;
        transactionData = await this.buildTransaction("safeTransferFrom",
            checkedFromAddress,
            checkedToAddress,
            tokenIds,
            values,
            data || new Uint8Array(),
        )
        console.log('transactionData', transactionData);
        return this.submitTransaction(transactionData, note)
    }

    /**
     *
     * @param fromAddress - The sender of the address token.
     * @param toAddress - The receiver of the address token.
     * @param tokenId - The ID of the sender address token.
     * @param data - Send additional data (bytes) only if required by contract.
     * @param note
     */
    async safeTransferFrom(toAddress: string, tokenId: number, data: Uint8Array = null, note: string = "", fromAddress?: string): Promise<CreateTransactionResponse> {
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress || await this.getAddress())
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress)
        let transactionData
        if (data) {
            transactionData = await this.buildTransaction("safeTransferFrom",
                checkedFromAddress,
                checkedToAddress,
                tokenId,
                data
            )
        } else {
            transactionData = await this.buildTransaction("safeTransferFrom",
                checkedFromAddress,
                checkedToAddress,
                tokenId
            )
        }
        return this.submitTransaction(transactionData, note);
    }


    /**
     * Provide an operator with approval permission or revoke them
     * @param operatorAddress - Approved operator address
     * @param isApproved - True to permit, False to revoke
     * @param notes - (Optional) Add a note to the transaction
     */
    async setApprovalForAll(operatorAddress: string, isApproved: boolean, notes?: string): Promise<CreateTransactionResponse> {
        const checkedOperatorAddress = Web3.utils.toChecksumAddress(operatorAddress)
        const transactionData = await this.buildTransaction("setApprovalForAll", checkedOperatorAddress, isApproved)
        return this.submitTransaction(transactionData, notes);
    }


    /** Views **/

    /**
     * Checks if contract supports a certain interface.
     * @param interfaceId - (Optional) The interface id. "0x80ac58cd" is ERC721 interface id. "0xd9b67a26" is ERC1155
     */
    supportsInterface(interfaceId: string = '0xd9b67a26'): Promise<boolean> {
        return this.callView("supportsInterface", interfaceId);
    }

    /**
     *
     * @param tokenId
     * @param ownerAddress
     */
    async balanceOf(tokenId: number, ownerAddress?: string): Promise<number> {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress || await this.getAddress())
        return this.callView("balanceOf", ownerCheckedAddress, tokenId);
    }

    /**
     *
     * @param ownersList -  A list of addresses
     * @param idList - A list of token Ids
     */
    async balanceOfBatch(idList: number[], ownersList?: string[]): Promise<number[]> {
        const checkedAddresses = ownersList?.map(address => Web3.utils.toChecksumAddress(address)) ||
            idList.map(async (res) => Web3.utils.toChecksumAddress(await this.getAddress()));
        return this.callView("balanceOfBatch", checkedAddresses, idList)
    }


    /**
     * Validates whether an operator has been approved by a stated owner.
     * @param ownerAddress - Address of the owner.
     * @param operatorAddress - Address of the meant to be operator.
     * return: True whether operator is approved, False otherwise
     */
    async isApprovedForAll(operatorAddress: string, ownerAddress?: string): Promise<boolean> {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress || await this.getAddress());
        const operatorCheckedAddress = Web3.utils.toChecksumAddress(operatorAddress);
        return this.callView("isApprovedForAll", ownerCheckedAddress, operatorCheckedAddress);
    }

    /**
     * @param tokenId
     */
    uri(tokenId: number): Promise<string> {
        return this.callView("uri", tokenId)
    }
}
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
    safeBatchTransferFrom(fromAddress: string, toAddress: string, tokenIds: number[], values: number[],
                          data: Uint8Array = null, note: string = ""): Promise<CreateTransactionResponse> {
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress)
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress)

        if (tokenIds?.length != values?.length) {
            throw new Error('Length of token_ids and values must match!');
        }

        if (data) {
            return this.submitTransaction(this.buildTransaction("safeTransferFrom",
                checkedFromAddress,
                checkedToAddress,
                tokenIds,
                values,
                data
            ), note)
        }

        return this.submitTransaction(this.buildTransaction("safeTransferFrom",
            checkedFromAddress,
            checkedToAddress,
            tokenIds,
            values
        ), note)
    }

    /**
     *
     * @param fromAddress - The sender of the address token.
     * @param toAddress - The receiver of the address token.
     * @param tokenId - The ID of the sender address token.
     * @param data - Send additional data (bytes) only if required by contract.
     * @param note
     */
    safeTransferFrom(fromAddress: string, toAddress: string, tokenId: number, data: Uint8Array = null, note: string = ""): Promise<CreateTransactionResponse> {
        const checkedFromAddress = Web3.utils.toChecksumAddress(fromAddress)
        const checkedToAddress = Web3.utils.toChecksumAddress(toAddress)
        if (data) {
            return this.submitTransaction(this.buildTransaction("safeTransferFrom",
                checkedFromAddress,
                checkedToAddress,
                tokenId,
                data
            ), note);
        }
        return this.submitTransaction(this.buildTransaction("safeTransferFrom",
            checkedFromAddress,
            checkedToAddress,
            tokenId
        ), note);
    }


    /**
     * Provide an operator with approval permission or revoke them
     * @param operatorAddress - Approved operator address
     * @param isApproved - True to permit, False to revoke
     * @param notes - (Optional) Add a note to the transaction
     */
    setApprovalForAll(operatorAddress: string, isApproved: boolean, notes?: string): Promise<CreateTransactionResponse> {
        const checkedOperatorAddress = Web3.utils.toChecksumAddress(operatorAddress)
        return this.submitTransaction(this.buildTransaction("setApprovalForAll", checkedOperatorAddress, isApproved, notes), notes);
    }


    /** Views **/

    /**
     * Checks if contract supports a certain interface.
     * @param interfaceId - (Optional) The interface id. "0x80ac58cd" is ERC721 interface id. "0xd9b67a26" is ERC1155
     */
    supports_interface(interfaceId: string = ""): Promise<boolean> {
        if (interfaceId === '') {
            interfaceId = "0xd9b67a26"
        }
        return this.callView("supportsInterface", interfaceId);
    }

    /**
     *
     * @param ownerAddress
     */
    balanceOf(ownerAddress: string): Promise<number> {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress)
        return this.callView("balanceOf", ownerCheckedAddress);
    }

    /**
     *
     * @param ownersList -  A list of addresses
     * @param idList - A list of token Ids
     */
    balanceOfBatch(ownersList: string[], idList: string[]): Promise<number[]> {
        const checkedAddresses = ownersList.map(address => Web3.utils.toChecksumAddress(address));
        return this.callView("balanceOfBatch", checkedAddresses, idList)
    }


    /**
     * Validates whether an operator has been approved by a stated owner.
     * @param ownerAddress - Address of the owner.
     * @param operatorAddress - Address of the meant to be operator.
     * return: True whether operator is approved, False otherwise
     */
    isApprovedForAll(ownerAddress: string, operatorAddress: string): Promise<boolean> {
        const ownerCheckedAddress = Web3.utils.toChecksumAddress(ownerAddress)
        const operatorCheckedAddress = Web3.utils.toChecksumAddress(operatorAddress)
        return this.callView("isApprovedForAll", ownerCheckedAddress, operatorCheckedAddress);
    }

    /**
     * @param uri_id - URI id of a contract
     */
    uri(uri_id: number): Promise<string> {
        return this.callView("uri", uri_id)
    }
}
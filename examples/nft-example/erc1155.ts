import * as fs from "fs";
import {BridgeParams, Chain, ERC1155, FireblocksSDK} from "fireblocks-defi-sdk";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "";
const FIREBLOCKS_API_SECRET_PATH = '../../../fireblocks.key';
const FIREBLOCKS_API_KEY_PATH = '../../api-client-key.txt';


/**
 * Following example describes how to crate a ERC721 token connection, and
 * perform read and write actions using Fireblocks infrastructure.
 */
(async function () {

    /** Fireblocks Initialization **/

    // Read file containing you Fireblocks Api Seacret Key
    const apiSecret = fs.readFileSync(FIREBLOCKS_API_SECRET_PATH, "utf8");

    // Read file containing you Fireblocks Api Key
    const apiKey = fs.readFileSync(FIREBLOCKS_API_KEY_PATH, "utf8");

    // Initialize Fireblocks SDK
    const fireblocksApiClient: FireblocksSDK = new FireblocksSDK(apiSecret, apiKey, process.env.FIREBLOCKS_API_BASE_URL);

    // Build Bridge parameters to you Fireblocks account.
    const bridgeParams: BridgeParams = {
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0",
        contractAddress: CONTRACT_ADDRESS,
        chain: CHAIN
    }

    // Initialize ERC721 Token with Fireblocks Bridge parameters
    const erc1155 = new ERC1155(bridgeParams);

    const RECEIVER_ADDRESS = '<receiver-address>';
    const TOKEN_ID = 1;

    /** Read/Write Examples **/

    // Perform a read balanceOf action
    const balance = await erc1155.balanceOf(TOKEN_ID);
    console.log('balanceOf response', balanceOf);

    // Perform write setApprovalForAll action
    const setApprovalForAll = await erc1155.setApprovalForAll(RECEIVER_ADDRESS, true);
    console.log('setApprovalForAll response', setApprovalForAll);


}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
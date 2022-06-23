import * as fs from "fs";
import {BridgeParams, Chain, ERC1155, FireblocksSDK} from "fireblocks-defi-sdk";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "0x73544d05210Be973901EA33034191a61969f9271";
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

    const RECEIVER_ADDRESS = '0x16127F7026615276F0f537Af59B84F39758b9A24';
    const TOKEN_ID = 1;

    /** Read/Write Examples **/

    // Perform a read action getBalance uses you Fireblocks Vault address (address is optional)
    const getBalance = await erc1155.balanceOf(TOKEN_ID);
    console.log('getBalance response', getBalance);

    // Perform write action, transferFrom that
    const transferFrom = await erc1155.setApprovalForAll(RECEIVER_ADDRESS, true);
    console.log('transferFrom response', transferFrom);


}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
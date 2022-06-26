import * as fs from "fs";
import {BridgeParams, Chain, ERC721, FireblocksSDK} from "fireblocks-defi-sdk";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "<contract-address>";
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
    const erc721 = new ERC721(bridgeParams);

    /** Read/Write Examples **/

    const RECEIVER_ADDRESS = '<receiver-address>';
    const TOKEN_ID = 20;

    // Perform a read action balanceOf uses you Fireblocks Vault address (address is optional)
    const getBalance = await erc721.balanceOf();
    console.log('getBalance response', getBalance);



    // Perform write action transferFrom from Fireblocks vault to an address
    const transferFrom = await erc721.transferFrom(RECEIVER_ADDRESS, TOKEN_ID);
    console.log('transferFrom response', transferFrom);

}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
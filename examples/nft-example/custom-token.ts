import * as fs from "fs";
import {BridgeParams, Chain, CustomToken, FireblocksSDK} from "fireblocks-defi-sdk";
import {ABIStructure} from "../../dist/types/abi";

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

    const READ_ABI: ABIStructure = [] // you can also use await Utils.fetchABI(CONTRACT_ABI_ADDRESS)

    // Initialize Custom Token with Fireblocks Bridge parameters
    const customToken = new CustomToken(bridgeParams, READ_ABI);

    /** Read/Write Examples **/

    const RECEIVER_ADDRESS = '<receiver-address>';
    const INTERFACE_ADDRESS = '';

    // Perform a read action supportInterface
    const supportInterface = await customToken.callReadFunction('supportsInterface', INTERFACE_ADDRESS);
    console.log('supportInterface response', supportInterface);


    // Perform write action transferOwnership
    const transferFrom = await customToken.callWriteFunction('transferOwnership', RECEIVER_ADDRESS);
    console.log('transferFrom response', transferFrom);


}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
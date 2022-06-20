import * as fs from "fs";
import {BridgeParams, Chain, Utils, FireblocksSDK, CustomToken} from "fireblocks-defi-sdk";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "0x6C2A20b920a943237688dD6651200cAB253F5565";

process.env.FIREBLOCKS_API_SECRET_PATH = '../../../fireblocks_secret.key';
process.env.FIREBLOCKS_API_KEY_PATH = '../../api-client-key.txt';
(async function () {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const apiKey = fs.readFileSync(process.env.FIREBLOCKS_API_KEY_PATH, "utf8");
    const fireblocksApiClient: FireblocksSDK = new FireblocksSDK(apiSecret, apiKey, process.env.FIREBLOCKS_API_BASE_URL);

    const bridgeParams: BridgeParams = {
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0", // "0" for default vault account
        contractAddress: CONTRACT_ADDRESS,
        chain: CHAIN
    }
    const ABI = await Utils.fetchABI(CONTRACT_ADDRESS)

    const customToken = new CustomToken(bridgeParams, ABI);
    const response = await customToken.callReadFunction('supportsInterface', '');
    console.log(response);
}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
import {FireblocksSDK} from "fireblocks-sdk";
import * as fs from "fs";
import {Chain, ERC1155} from "../../src";
import {BridgeParams} from "../../src/interfaces/bridge-params";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "0x7cC1FB0fC8Dd54Cc63a01F1eC29B3375B8c9dCac";

process.env.FIREBLOCKS_API_SECRET_PATH = '../../../fireblocks_secret.key';
process.env.FIREBLOCKS_API_KEY_PATH = '../../api-client-key.txt';
(async function () {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const apiKey = fs.readFileSync(process.env.FIREBLOCKS_API_KEY_PATH, "utf8");
    const fireblocksApiClient: FireblocksSDK = new FireblocksSDK(apiSecret, apiKey, process.env.FIREBLOCKS_API_BASE_URL);

    const bridgeParams: BridgeParams = {
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0",
        externalWalletId: CONTRACT_ADDRESS,
        chain: CHAIN
    }
    const erc1155 = new ERC1155(bridgeParams);

    const response = await erc1155.supportsInterface('');
    console.log(response);
}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
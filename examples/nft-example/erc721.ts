import * as fs from "fs";
import {BridgeParams, Chain, ERC721, FireblocksSDK} from "fireblocks-defi-sdk";

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
        contractAddress: CONTRACT_ADDRESS,
        chain: CHAIN
    }
    const erc721 = new ERC721(bridgeParams);

    const response = await erc721.balanceOf('0x6aDab072713e930C099fc18F7A967252059149Ea');
    console.log(response);
}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
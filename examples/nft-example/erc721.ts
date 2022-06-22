import * as fs from "fs";
import {BridgeParams, Chain, ERC721, FireblocksSDK} from "fireblocks-defi-sdk";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "0x7cC1FB0fC8Dd54Cc63a01F1eC29B3375B8c9dCac";

process.env.FIREBLOCKS_API_SECRET_PATH = '../../../fireblocks.key';
process.env.FIREBLOCKS_API_KEY_PATH = '../../api-client-key.txt';
(async function () {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const apiKey = fs.readFileSync(process.env.FIREBLOCKS_API_KEY_PATH, "utf8");

    const fireblocksApiClient: FireblocksSDK = new FireblocksSDK(apiSecret, apiKey, process.env.FIREBLOCKS_API_BASE_URL);

    const bridgeParams: BridgeParams = {
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "2",
        contractAddress: CONTRACT_ADDRESS,
        chain: CHAIN
    }
    const erc721 = new ERC721(bridgeParams);

    const response = await erc721.transferFrom('0x76D6063b0A35Ec0f84fd22bA2F93754Fbf180e59',
        '0x2709d3216186eB40aA91754c4722C9e80DDA4090', 102);
    console.log(response);
}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
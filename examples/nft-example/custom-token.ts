import {FireblocksSDK} from "fireblocks-sdk";
import * as fs from "fs";
import {Chain, CustomToken, ERC721} from "../../src";
import {BridgeParams} from "../../src/interfaces/bridge-params";
import {BaseToken} from "../../src/nft/base-token";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "0x6C2A20b920a943237688dD6651200cAB253F5565";
process.env.FIREBLOCKS_API_SECRET_PATH = '../../../fireblocks_secret.key';
process.env.FIREBLOCKS_API_KEY = '8a3e4a34-7acf-4165-bdbf-93f9f7b8cc55';
(async function () {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const fireblocksApiClient: FireblocksSDK = new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_API_KEY, process.env.FIREBLOCKS_API_BASE_URL);

    const bridgeParams: BridgeParams = {
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0", // "0" for default vault account
        contractAddress: CONTRACT_ADDRESS,
        chain: CHAIN
    }
    const ABI = await BaseToken.fetchABI(CONTRACT_ADDRESS)

    const erc721 = new CustomToken(bridgeParams, ABI);
    //
    // const response = await erc721.callReadFunction('supportsInterface', '');
    console.log(ABI);
    // console.log(response);
}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
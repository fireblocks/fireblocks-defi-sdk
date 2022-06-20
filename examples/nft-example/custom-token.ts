import {FireblocksSDK} from "fireblocks-sdk";
import * as fs from "fs";
import {CustomToken, ERC721} from "../../src";
import {Chain} from "fireblocks-defi-sdk";
import {BridgeParams} from "../../src/interfaces/bridge-params";
import {BaseToken} from "../../src/nft/base-token";

const CHAIN = Chain.KOVAN;
// const CONTRACT_ADDRESS = "0x7cC1FB0fC8Dd54Cc63a01F1eC29B3375B8c9dCac";
const CONTRACT_ADDRESS = "0x6C2A20b920a943237688dD6651200cAB253F5565";
// const CONTRACT_ABI = [{
//     "constant": false,
//     "inputs": [{"name": "_greeting", "type": "string"}],
//     "name": "greet",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
// }, {
//     "constant": true,
//     "inputs": [],
//     "name": "getGreeting",
//     "outputs": [{"name": "", "type": "string"}],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
// }];
const GREETING = "Hello";
process.env.FIREBLOCKS_API_SECRET_PATH = '../../../fireblocks_secret.key';
process.env.FIREBLOCKS_API_KEY = '';
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
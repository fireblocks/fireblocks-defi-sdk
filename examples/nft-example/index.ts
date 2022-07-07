import {FireblocksSDK} from "fireblocks-sdk";
import {Chain} from "fireblocks-defi-sdk";
import * as fs from "fs";
import {CustomToken} from "../../src";
import {BridgeParams} from "../../src/interfaces/bridge-params";

const CHAIN = Chain.KOVAN;
const CONTRACT_ADDRESS = "0xcbe74e21b070a979b9d6426b11e876d4cb618daf";
const CONTRACT_ABI = [{
    "constant": false,
    "inputs": [{"name": "_greeting", "type": "string"}],
    "name": "greet",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getGreeting",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}];
const GREETING = "Hello";
process.env.FIREBLOCKS_API_SECRET_PATH = '../../';
(async function () {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const fireblocksApiClient: FireblocksSDK = new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_API_KEY, process.env.FIREBLOCKS_API_BASE_URL);

    const bridgeParams: BridgeParams = {
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0",
        externalWalletId: CONTRACT_ADDRESS,
        chain: CHAIN
    }
    const customToken = new CustomToken(bridgeParams, JSON.stringify(CONTRACT_ABI));

    const response = await customToken.callReadFunction('greet', GREETING);
    console.log(response);
}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
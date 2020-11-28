import { FireblocksSDK } from "fireblocks-sdk";
import { EthersBridge, Chain } from "fireblocks-defi-sdk";
import { ethers, PopulatedTransaction } from "ethers";
import * as fs from "fs";

const CHAIN = Chain.ROPSTEN;
const CONTRACT_ADDRESS = "0xcbe74e21b070a979b9d6426b11e876d4cb618daf";
const CONTRACT_ABI = [{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"greet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
const GREETING = "Hello";


async function processTransaction(bridge: EthersBridge, tx: PopulatedTransaction) {
    const res = await bridge.sendTransaction(tx);

    console.log("Waiting for the transaction to be signed and mined");

    const txHash = await bridge.waitForTxHash(res.id);

    console.log(`Transaction ${res.id} has been broadcast. TX Hash is ${txHash}`);
}

(async function() {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const fireblocksApiClient = new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_API_KEY, process.env.FIREBLOCKS_API_BASE_URL);

    const bridge = new EthersBridge({ 
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0",
        externalWalletId: process.env.FIREBLOCKS_EXTERNAL_WALLET,
        chain: CHAIN
    });

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethers.getDefaultProvider(CHAIN));

    const tx: PopulatedTransaction = await contract.populateTransaction.greet(GREETING);

    console.log("Sending greet trasnaction for signing");

    await processTransaction(bridge, tx);
}()).catch(err=> {
    console.log("error", err);
    process.exit(1);
});
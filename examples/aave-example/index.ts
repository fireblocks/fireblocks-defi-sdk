import {EthersBridge, Chain, FireblocksSDK} from "fireblocks-defi-sdk";
import * as fs from "fs";
import {ethers, PopulatedTransaction} from "ethers";
import LendingPoolAddressesProviderABI from "./abi/LendingPoolAddressesProvider.json"
import LendingPoolABI from "./abi/LendingPool.json"
import * as inquirer from "inquirer";
import {formatEther, parseEther} from "ethers/lib/utils";


const chain = Chain[process.env.ETH_CHAIN] || Chain.ROPSTEN;
const provider = ethers.getDefaultProvider(chain);

async function depositEthToAave(bridge: EthersBridge, ethAmount: string) {
    const lpAddressProviderAddress = {
        [Chain.MAINNET]: '0x24a42fD28C976A61Df5D00D0599C34c4f90748c8',
        [Chain.ROPSTEN]: '0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728',
        [Chain.KOVAN]: '0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5'
    };

    // Retrieve the LendingPool address
    const lpAddressProviderContract = new ethers.Contract(
        lpAddressProviderAddress[chain],
        LendingPoolAddressesProviderABI,
        provider)

    // Get the latest LendingPool contract address
    const lpAddress = await lpAddressProviderContract.getLendingPool();

    const lpContract = new ethers.Contract(lpAddress, LendingPoolABI, provider);

    const amountInWei = parseEther(ethAmount).toString();

    const aaveETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

    const tx = await lpContract.populateTransaction.deposit(aaveETH, amountInWei, 0, {value: amountInWei});

    await processTransaction(bridge, tx, `Deposit ${ethAmount} ETH to Aave`);
}


async function processTransaction(bridge: EthersBridge, tx: PopulatedTransaction, note?: string) {
    const res = await bridge.sendTransaction(tx, note);

    console.log(`Waiting for transaction ${res.id} to be signed and mined`);

    const txHash = await bridge.waitForTxHash(res.id);

    console.log(`Transaction ${res.id} has been broadcast. TX Hash is ${txHash}`);
}


(async function () {
    const apiSecret = fs.readFileSync(process.env.FIREBLOCKS_API_SECRET_PATH, "utf8");
    const fireblocksApiClient = new FireblocksSDK(apiSecret, process.env.FIREBLOCKS_API_KEY, process.env.FIREBLOCKS_API_BASE_URL);

    const bridge = new EthersBridge({
        fireblocksApiClient,
        vaultAccountId: process.env.FIREBLOCKS_SOURCE_VAULT_ACCOUNT || "0",
        externalWalletId: process.env.FIREBLOCKS_EXTERNAL_WALLET,
        chain
    });

    const walletAddress = await bridge.getDepositAddress();
    const currentEthAmount = formatEther(await provider.getBalance(walletAddress));

    console.log(`Current ETH amount in your wallet: ` + currentEthAmount);
    const {ethAmountToDeposit} = await inquirer.prompt<any>({
        type: "input",
        name: "ethAmountToDeposit",
        default: 0,
        message: "Enter the amount of ETH to deposit to Aave"
    });

    await depositEthToAave(bridge, ethAmountToDeposit);

}()).catch(err => {
    console.log("error", err);
    process.exit(1);
});
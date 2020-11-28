
import { FireblocksSDK } from "fireblocks-sdk";
import { EthersBridge, Chain } from "fireblocks-defi-sdk";
import { Router , TradeOptions, WETH, CurrencyAmount, ETHER, Fetcher, Trade, Route, Percent, TradeType, SwapParameters, ChainId } from "@uniswap/sdk";
import { ethers, PopulatedTransaction } from "ethers";
import * as fs from "fs";
import { abi as uniswapRouterV2ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';
import { formatEther, parseEther } from "ethers/lib/utils";
import * as inquirer from "inquirer";
​
const chain = Chain[process.env.ETH_CHAIN || "ROPSTEN"];    
const chainId = ChainId[process.env.ETH_CHAIN || "ROPSTEN"];
const provider = ethers.getDefaultProvider(chain);

async function swapEthToDai(bridge: EthersBridge, amountInEth: string, recipient: string) {
    // Swap 0.01 ETH with DAI

    const daiAddress = {
        [Chain.ROPSTEN]: '0xB5E5D0F8C0cbA267CD3D7035d6AdC8eBA7Df7Cdd',
        [Chain.MAINNET]: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    }

    const dai = await Fetcher.fetchTokenData(chainId, daiAddress[chain]);


    const weth = WETH[chainId];    
    const pair = await Fetcher.fetchPairData(dai, weth);
​
    const route = new Route([pair], ETHER)
    const amountIn = parseEther(amountInEth).toString();
    const trade = new Trade(route, CurrencyAmount.ether(amountIn), TradeType.EXACT_INPUT);

    const tradeOptions: TradeOptions = {
        allowedSlippage: new Percent('50', '10000'),
        ttl: 3000,
        recipient
    };
    
    const swapParams: SwapParameters = Router.swapCallParameters(trade, tradeOptions);

    const uniswapRouterV2Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

    const router = new ethers.Contract(uniswapRouterV2Address, uniswapRouterV2ABI, provider);

    const swapTx = await router.populateTransaction[swapParams.methodName](...swapParams.args, { value: swapParams.value });

    await processTransaction(bridge, swapTx, `Swap ${amountInEth} ETH ⇄ Dai`);
}

async function processTransaction(bridge: EthersBridge, tx: PopulatedTransaction, note?: string) {
    const res = await bridge.sendTransaction(tx, note);

    console.log(`Waiting for transaction ${res.id} to be signed and mined`);

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
        chain
    });

    const walletAddress = await bridge.getDepositAddress();
    const currentEthAmount = formatEther(await provider.getBalance(walletAddress));

    console.log(`Current ETH amount in your wallet: ` + currentEthAmount);
    const { ethAmountToSwap } = await inquirer.prompt<any>({
        type: "input",
        name: "ethAmountToSwap",
        default: 0,
        message: "Enter the amount of ETH you wish to swap in exchange for Dai"
    });

    await swapEthToDai(bridge, ethAmountToSwap, walletAddress);

}()).catch(err=> {
    console.log("error", err);
    process.exit(1);
});
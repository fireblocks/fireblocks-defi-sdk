import { Chain } from "./chain";
import {FireblocksSDK} from "fireblocks-sdk";
import { Signer, providers } from "ethers";

export interface BridgeParams {
    fireblocksApiClient: FireblocksSDK;
    vaultAccountId: string;
    externalWalletId?: string;
    chain?: Chain;
    contractAddress?: string;
    signerOrProvider?: Signer | providers.Provider;
}

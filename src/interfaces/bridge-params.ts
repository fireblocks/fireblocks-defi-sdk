import { FireblocksSDK } from "fireblocks-sdk";
import { Chain } from "./chain";

export interface BridgeParams {
    fireblocksApiClient: FireblocksSDK;
    vaultAccountId: string;
    externalWalletId: string;
    chain?: Chain;
}

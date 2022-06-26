import { Chain } from "./chain";
import {FireblocksSDK} from "fireblocks-sdk";

export interface BridgeParams {
    fireblocksApiClient: FireblocksSDK;
    vaultAccountId: string;
    externalWalletId?: string;
    chain?: Chain;
    contractAddress?: string;
}

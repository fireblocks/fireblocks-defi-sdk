import { BridgeParams } from "../interfaces/bridge-params";
import { EthersBridge } from "./ethers-bridge";
import { Web3Bridge } from "./web3-bridge";

export class BridgeFactory {
    constructor(readonly params: BridgeParams) {
    };

    createEthersBridge() {
        return new EthersBridge(this.params);
    }

    createWenBridge() {
        return new Web3Bridge(this.params);
    }
 }

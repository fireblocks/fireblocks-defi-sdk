import {ABIStructure} from "../types/abi";
import fetch from "node-fetch";

export class Utils {

    static async fetchABI(contractAddress: string): Promise<ABIStructure> {
        try {
            const res = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`);
            if (res.status !== 200) {
                throw new Error();
            }

            const contentBlob = await res.blob();
            const abiString = JSON.parse(await contentBlob.text());

            return JSON.parse(abiString.result);
        } catch (e) {
            throw new Error('Cant fetch or decode ABI');
        }
    }
}
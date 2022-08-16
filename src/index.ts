import { Web3Resolver } from "./defaults/web3-resolver";

async function start() {
    console.log("Start!");
    const web3res = new Web3Resolver();
    try {
        const res = await web3res.resolve("federicocosta.wallet");
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}
start()
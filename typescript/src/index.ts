import Application from "./app";
import { PORT } from "./config";
import Custodian from "./custodian";
import router from "./router";

async function main() {
    const app = new Application();
    
    await Custodian.isValidCustodian();

    app.addRouter(router);
    app.start(PORT);
}

main()
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    });
import express, { Request, Response, Router } from "express";
import helmet from "helmet";
import cors from "cors";

class Application {
    #app = express();

    constructor() {
        this.initializeMiddleware();
    }

    private initializeMiddleware() {
        this.#app.use(express.json());
        this.#app.use(cors());
        this.#app.use(helmet());
    }

    public addRouter(router: Router) {
        this.#app.use(router);
    }

    public start(port: number) {
        this.#app.listen(port, () => {
            console.log("Background Signer API Listening on PORT: ", port);
        });
    }
}

export default Application;

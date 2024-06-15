import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { isAddress } from "ethers";
import Distribute from "./distribute";
import Balance from "./balance";
import { json, urlencoded } from "express";

/**
 * Initialize Express Application
 */
const app = express();

/** Express Middleware */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", (_, res: Response) => {
	return res.status(200).send("API Distributor Healthy");
});

app.get("/claim/:address", async (req: Request, res: Response) => {
	const { address } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	try {
		const distribute = await Distribute({ address });
		return res.status(200).send({ distribute });
	} catch (error) {
		return res.status(500).send("Claim transaction failed");
	}
});

app.get("/balance", async (_, res: Response) => {
	try {
		const balance = await Balance();
		return res.status(200).json({ balance });
	} catch (error) {
		return res.status(500).send("Error obtaining balance");
	}
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`SKALE API Distributor Listening on ${PORT}`);
});

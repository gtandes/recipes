import cors from "cors";
import dotenv from "dotenv-safe";
import { isAddress } from "ethers";
import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import { check, validationResult } from "express-validator";
import helmet from "helmet";

import Balance from "./balance";
import Distribute from "./distribute";

dotenv.config();

/*Initialize Express Application*/
const app = express();

/** Express Middleware */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Disable x-powered-by header
app.disable("x-powered-by");

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 15, // limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'"],
		styleSrc: ["'self'"],
		imgSrc: ["'self'", "data:"],
		connectSrc: ["'self'"],
		fontSrc: ["'self'"],
		objectSrc: ["'none'"],
		mediaSrc: ["'self'"],
		frameSrc: ["'none'"]
	}
}));

app.get("/", (_, res: Response) => {
	return res.status(200).send("API Distributor Healthy");
});

app.get("/claim/:address", [
	check("address").isEthereumAddress().withMessage("Invalid Ethereum Address")
], async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { address } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	try {
		const distribute = await Distribute({ address });
		return res.status(200).send({ distribute });
	} catch (error) {
		console.error("Claim transaction error:", error);

		const errorMessage = (error instanceof Error) ? error.message : "Unknown error";

		return res.status(500).send(`Claim transaction failed: ${errorMessage}`);
	}
});

app.get("/balance", async (_, res: Response) => {
	try {
		const balance = await Balance();
		return res.status(200).json({ balance });
	} catch (error) {
		console.error("Error obtaining balance:", error);
		const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
		return res.status(500).send(`Error obtaining balance: ${errorMessage}`);
	}
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
	console.log(`SKALE API Distributor Listening on ${PORT}`);
});

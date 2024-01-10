const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {isAddress} = require("ethers");
const Distribute = require("./distribute");
const Balance = require("./balance");
const {json, urlencoded} = require("express");

/**
 * Initialize Express Application
 */
const app = express();

/** Express Middleware */
app.use(json());
app.use(urlencoded());
app.use(cors());
app.use(helmet());

app.get("/", (_, res) => {
	return res.status(200).send("API Distributor Healthy");
});

app.get("/claim/:address", async(req, res) => {

	const { address } = req.params;

	if (!isAddress(address)) return res.status(400).send("Invalid Ethereum Address");

	const distribute = await Distribute({ address });

	return res.status(200).send({
		distribute
	});


});

app.get("/balance", async(_, res) => {
	return res.status(200).send({
		balance: await Balance()
	});
});


app.listen(8888, () => {
	console.log("SKALE API Distributor Listening on ", 8888);
});

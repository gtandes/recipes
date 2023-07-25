import { Router } from "express";
import BackgroundSigners from "./background_signers";
import { parseEther } from "viem";

const router = Router();

router.post("/mint", async (req, res) => {
    const userId: string = req.body.userId;
    const address = await BackgroundSigners.getUser(userId);
    
    try {
        await BackgroundSigners.backgroundSignerAction(userId, [address, parseEther("1")], "mint");
        return res.status(200).send("Minted Successfully");
    } catch (err) {
        return res.status(500).send("Error Minting");
    }
});

router.post("/burn", async (req, res) => {
    const userId: string = req.body.userId;
    const address = await BackgroundSigners.getUser(userId);
    
    try {
        await BackgroundSigners.backgroundSignerAction(userId, [parseEther("1")], "burn");
        return res.status(200).send("Burned Successfully");
    } catch (err) {
        return res.status(500).send("Error Burning");
    }
});

export default router;
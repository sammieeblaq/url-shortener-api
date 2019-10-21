const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route GET /:code 
router.get("/:code", async (req, res) => {
try {
    const urlCode = req.params.code;
    const url = await Url.findOne({ urlCode });
    // to check if url exists
    if (url) {
        res.redirect(url.longUrl)
    } else {
        return res.status(404).json("No url found!!!")
    }
} catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
}
})



module.exports = router;
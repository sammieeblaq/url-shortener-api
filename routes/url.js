const express  = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

// Routes Get 
router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get("baseUrl");

    if(!validUrl.isUri(baseUrl)) {
        res.status(401).json("Invalid base url");
    }

    // Create url code 
    const urlCode = shortid.generate();

    // Chech long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;
                url = new Url({ 
                    longUrl, 
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save() 
                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json("Server error");
        }
    } else {
        res.status(401).json("Invalid long url");
    }
});



module.exports = router;
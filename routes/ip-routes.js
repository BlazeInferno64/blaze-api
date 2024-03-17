const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const cors = require("cors");
const rateLimit = require("express-rate-limit");


router.use(cors({
    origin: "*"
}))

const time = 5 * 60 * 1000

const limiter = rateLimit({
    windowsMS:time,
    max: 5,
    message: `Too many api requests! Please try again after 5 mins`
})

router.use(limiter);

var customHeaders = (req, res, next) => {
    res.set("X-Powered-By","Blaze Web Server");
    next();
}

router.all("*",customHeaders);

router.get("/",(req, res) => {
    const ipFormat = req.query.format;
    if(!ipFormat){
        const ip = req.ip;
        res.set("Ip-Api-Version","1.0.0");
        res.send(ip);
        console.log(`Incoming ip request from:${ip}`)
    }
    else{
        if(ipFormat == "json"){
            const ip = req.ip;
            res.set("Ip-Api-Version","1.0.0");
            res.json({
                "ip": ip
            })
            console.log(`Incoming ip request from:${ip}`)
        }
    }
})

module.exports = router;
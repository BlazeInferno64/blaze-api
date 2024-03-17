const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const router = express.Router();
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

const readJSONFile = (filename) => {
    const filePath = path.join(__dirname, "../public/api/user-api", filename);
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

var customHeaders = (req, res, next) => {
    res.set("X-Powered-By","Blaze Web Server");
    res.set("Users-Available","4");
    next();
}

router.all("*",customHeaders);

router.get("/",(req, res) => {
    //console.log(req.query);
    const username = req.query.name;
    if(!username) {
        res.sendFile(__dirname + "/index.html");
    }
    else{
        if(username == "John") {
            const myData = readJSONFile("dummy-user.json");
            if(myData) {
                console.log(myData);
                res.json(myData);
            }
        }
        if(username == "Jack") {
            const myData = readJSONFile("dummy-user2.json");
            if(myData) {
                console.log(myData);
                res.json(myData);
            }
        }
        if(username == "Jane") {
            const myData = readJSONFile("dummy-user3.json");
            if(myData) {
                console.log(myData);
                res.json(myData);
            }
        }
        if(username == "Michael") {
            const myData = readJSONFile("dummy-user4.json");
            if(myData) {
                console.log(myData);
                res.json(myData);
            }
        }
        else {
            res.status(404).json({"Message": "No user found!"});
        }
    }
})



module.exports = router
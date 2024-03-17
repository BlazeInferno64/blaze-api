const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const time = 5 * 60 * 1000

const limiter = rateLimit({
    windowsMS:time,
    max: 5,
    message: `Too many api requests! Please try again after 5 mins laters`
})

router.use(limiter);


const readJSONFile = (filename) => {
    const filePath = path.join(__dirname, "/visitor-count", filename);
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
    next();
}

router.all("*",customHeaders);

router.get("/",(req, res) => {
    const routerFormat = req.query.format;
    const visitorsData = readJSONFile("count.json"); 
    const path = "./routes/visitor-count/count.json"
    
    if(!routerFormat) {
        fs.readFile(path,(error, data) => {
            if(error) {
                console.log(error);
                return;
            }
            else{
                const parsedData = JSON.parse(data);
                parsedData.Count = parseInt(parsedData.Count) + 1;
                fs.writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
                    if(err){
                        console.log(`Error occured while updating data:${err}`);
                        res.send(`Oops! an error occured! ${err}`);
                        return;
                    }
                    else{
                        console.log(`Data updated sucessfully!`);
                        res.json(visitorsData.Count);
                    }
                })
            }
        })
    }
    else {
        if(routerFormat == "json") {
            const visitor = visitorsData.Count;
            fs.readFile(path,(error, data) => {
                if(error) {
                    console.log(error);
                    return;
                }
                else{
                    const parsedData = JSON.parse(data);
                    parsedData.Count = parseInt(parsedData.Count) + 1;
                    fs.writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
                        if(err){
                            console.log(`Error occured while updating data:${err}`);
                            res.send(`Oops! an error occured! ${err}`);
                            return;
                        }
                        else{
                            console.log(`Data updated sucessfully!`);
                            res.json(visitorsData);
                        }
                    })
                }
            })
        }
    }
})





module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

router.use(cors({
    origin: "*"
}))

const time = 5 * 60 * 1000

const limiter = rateLimit({
    windowsMS:time,
    max: 5,
    message: `Too many api requests! Please try again after 5 mins laters`
})

router.use(limiter);

const readJSONFile = (filename) => {
    const filePath = path.join(__dirname, "../public/api/post-user-api", filename);
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
    const filePath = path.join(__dirname, "../public/api/index.html")
    res.set("Post-User-Api-Version","1.0.0");
    res.sendFile(filePath);
})
router.get("/data",(req, res) => {
    const userFile = readJSONFile("user.json");
    res.json(userFile);
})

router.get("/submit",(req, res) => {
    res.set("Type-Error","User cannot be posted using GET method!")
    res.status(403).send("Only post method is allowed!")
})

router.post("/submit",(req, res) => {
    const username = req.body.name;
    const description = req.body.about;
    const favLang = req.body.language;
    const hobbies = req.body.hobbies;

    const fileLocation = path.join(__dirname, "../public/api/post-user-api/user.json");

    if(username == "" || description == "" || favLang == "" || hobbies == ""){
        res.status(400).send("Cannot create user with empty values!")
    }
    else{
        fs.readFile(fileLocation, (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                const parsedData = JSON.parse(data);
                parsedData.Name = username;
                parsedData.Hobbies = hobbies;
                parsedData.Favourite_Language = favLang;
                parsedData.Description = description;
    
                fs.writeFile(fileLocation, JSON.stringify(parsedData, null, 2), (err) => {
                    if(err){
                        console.log(`Error occured:${err}`);
                        res.set("Post-User-Api-Version","1.0.0");
                        res.send(`An Error Occured:${err}`);
                        return;
                    }
                    else{
                        console.log(`Data has been updated sucessfully!`);
                        res.set("Post-User-Api-Version","1.0.0");
                        res.send(`Done! data has been updated successfully, you have entered - Name as ${username},Description as ${description}, Favoruite Programming Language as ${favLang}, Hobby as ${hobbies}`);
                    }
                })
            }
        })
    }

})






module.exports = router;
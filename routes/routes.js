const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const users = require("../data/data.json");

var jsonParser = bodyParser.json();
var urlEncodedParser = express.urlencoded({extended: false});

var customHeaders = (req, res, next) => {
    res.set("X-Powered-By", "Blaze Api");
    next();
}

router.use(cors({
    origin: "*"
}))

router.all("*", customHeaders);

router.get("/", (req, res) => {
    res.set("X-Api-Version", "1.0.0");
    res.json({
        Message: "For api usage please refer to the docs present at https://github.com/blazeinferno64/blaze-api"
    })
    console.log(`Incoming Api GET request...`);
})

router.get("/status", (req, res) => {
    res.set("X-Api-Version", "1.0.0");
    res.json({
        status: "active",
        Message: "Server is up and running!"
    })
})

router.get("/test", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

router.get("/ip", (req, res) => {
    const ip = req.ip;
    const { format } = req.query;
    res.set("X-Ip-Engine", "1.0.0");
    if(!format){
        console.log(`Incoming request from ${ip}`);
        return res.send(ip);
    }
    else{
        if(format == "json"){
            console.log(`Incoming request from ${ip}`);
            return res.json({
                Ip: ip
            })
        }
        else{
            console.log(`Incoming request from ${ip}`);
            return res.status(400).json({
                status: `failed`,
                Message: `Format not recognised!`
            })
        }
    }
})

router.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === Number(id));
    res.set("X-Api-Version", "1.0.0");
    if(!user){
        console.log(`User not found with the given id: ${id}`);
        return res.status(404).json({
            Message: `User not found with the given id: ${id}`
        })
    }
    else{
        console.log(`User found with the given id: ${id}`);
        return res.json(user);
    }
})

router.get("/users", (req, res) => {
    const { id } = req.query;
    const num = Number(id);
    const user = users.find((user) => user.id === num);
    res.set("X-Api-Version", "1.0.0");
    if(!id){
        const filePath = path.join(__dirname, "../data/data.json");
        const stream = fs.createReadStream(filePath, "utf-8");
        stream.on("data", (chunk) => {
            res.write(chunk);
            console.log(`Writing data to the client...`);
        });
        stream.on("end", () =>{
            res.end();
            console.log(`Data has been successfully sent to the client!`);
        });
    }
    else{
        if(!user){
            console.log(`User not found with the given id: ${id}`);
            return res.status(404).json({
                Message: `User not found with the given id: ${id}`
            })
        }
        else{
            console.log(`User found with the given id: ${id}`);
            return res.json(user);
        }
    }
})

router.post("/users", urlEncodedParser,jsonParser, (req, res) => {
    const body = req.body;
    const filePath = path.join(__dirname, "../data/data.json");
    //const id = users.length;
    if(!body){
        res.set("X-Api-Version", "1.0.0");
        console.log(`Cannot create new user because body is empty!`);
        return res.status(400).json({ status: `failed`, Message: `Error: Cannot POST blank users!`})
    }
    users.push({...body, id: users.length + 1 });
    const stream = fs.createWriteStream(filePath);
    stream.write(JSON.stringify(users));

    stream.on("finish", () => {
        console.log(`Successfully created new user with id: ${users.length}!`);
    })
    stream.on("error", (err) => {
        console.error(err);
        return res.status(500).json({
            status: 'failed',
            Message: `Internal Server Error!`
        })
    })

    res.set("X-Api-Version", "1.0.0");
    return res.json({
        status: 'success',
        Message: `Successfully created user with id : ${users.length}`
    })
})

router.delete("/users/:id",urlEncodedParser, (req, res) => {
    const id = Number(req.params.id);
    const filePath = path.join(__dirname, "../data/data.json");
    
    fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
            console.error(err);
        }
        const myData = JSON.parse(data);
        const index = myData.findIndex(user => user.id === id);
        myData.splice(index, 1);
        
        if(index !== -1){
            const stream = fs.createWriteStream(filePath);
            stream.write(JSON.stringify(myData));
            stream.on("finish", () => {
                console.log(`User deleted sucessfully!`)
            })
            stream.on("error", (err) => {
                console.error(err);
                return res.status(500).json({
                    status: 'failed',
                    Message: `Internal Server Error!`
                })
            })
            return res.json({
                status: "success",
                Message: `User deleted sucessfully with id: ${id}!`
            })
        }
        else{
            return res.status(404).json({
                status: "failed",
                Message: "User not found!"
            })
        }
    })
})

router.all("*",(req, res) => {
    res.status(404).send(`404 not found!`);
})




module.exports = router;
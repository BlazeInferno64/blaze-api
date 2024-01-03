const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const router = express.Router();
const bodyParser = require("body-parser");
const PORT = 80;

app.use(express.urlencoded({extended: true,}));
app.enable("trust proxy");

const api = fs.readFileSync("./api/manifest.json");

app.get("/",(req, res) => {
    const ip = req.ip;
    res.send(`<p style="font-family: sans-serif;font-size: 1.5rem;">Blaze Rest Api</p><a style="font-family: sans-serif;" href="../test">Click here to test the api</a>`)
    console.log(`New Request From:${ip}`);
})


app.get("/test",(req, res) => {
    const ip = req.ip;
    res.sendFile(__dirname + "/index.html");
    console.log(`New Request From:${ip}`);
})

app.get("/api/v1",(req, res) => {
    const file = JSON.parse(api);
    res.json(file);
    const ip = req.ip;
    console.log(`New request from:${ip}`);
})


app.post("/api/v1/submit",(req, res) => {
    const path = './api/manifest.json';
    const text = req.body.text;
    const ip = req.ip;
    if(text == '') {
        res.send(`Data cannot be empty!`);
        console.log(`Data didn't got updated as the contents are empty!`);
    }
    else{
        console.log(`Data updated:${text}`);

        fs.readFile(path, (error, data) => {
            if(error) {
                console.log(error);
                return;
            }
            console.log(data);
    
            const parsedData = JSON.parse(data);
            parsedData.user.text = text;
            parsedData.user.ip = ip;
    
            fs.writeFile(path, JSON.stringify(parsedData, null, 2), (err)=> {
                if(err){
                    console.log(`Failed to write up JSON file! eror: ${err}`);
                    res.send(`An error occured! Error:${err}`);
                    return;
                }
                console.log("Updated JSON file successfully");
                res.send(`Data updated successfully! You have entered:${text}`);
            })
        })
    }
})

app.get("api/v1/submit",(req, res) => {
    res.send("Please attach a post method here to submit your data to server!");
})

app.get("*",(req, res) => {
    res.send("404 not found!");
})

server.listen(PORT,(err) => {
    if (err) console.log(err);
    console.log(`Server is live at port:${PORT}`);
})
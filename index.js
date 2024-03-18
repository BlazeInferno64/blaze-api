const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const { count } = require("console");
const port = 80;

const userRouter = require("./routes/user-routes");
const visitorRoute = require("./routes/visitor-route")
const ipRoute = require("./routes/ip-routes");
const postUserRoute = require("./routes/post-user-route");

app.use(express.urlencoded({extended: true,}));
app.enable("trust proxy");
app.use("/api/user", userRouter);
app.use("/visitor-count",visitorRoute);
app.use("/api/ip",ipRoute);
app.use("/api/post-user", postUserRoute);
app.use(express.static("public"));
app.set("view engine", "ejs");

var customHeaders = (req, res, next) => {
    res.set("X-Powered-By","Blaze Web Server");
    next();
}

app.all("*",customHeaders);

app.get("/",(req, res) => {
    res.set("Web-Server-Version","2.0.0")
    res.sendFile(__dirname + '/index.html')
})

app.get("/github",(req, res) => {
    console.log(`Redirecting visitors!`)
    res.redirect("https://github.com/blazeinferno64");
})

app.get("*",(req, res) => {
    res.status(404).send("404 Not Found!");
})

app.listen(port,(err) => {
    if (err) throw err;
    console.log(`Server is listening at port:${port}`);
})

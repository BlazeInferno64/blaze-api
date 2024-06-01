const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const apiRoute = require("./routes/routes");
const users = require("./data/data.json");

app.enable("trust proxy");

app.use("/api", apiRoute);

app.use("/users", cors({
    origin: "*"
}))

var customHeaders = (req, res, next) => {
    res.set("X-Powered-By", "Blaze Api");
    next();
}

app.all("*", customHeaders);

app.get("/",(req, res) => {
    res.set("X-Api-Version", "1.0.0");
    res.json({
        Message: "Welcome to Blaze Api please refer to the docs present at https://github.com/blazeinferno64/blaze-api for the api usage"
    })
    console.log(`Incoming GET request...`);
})

app.get("/about", (req, res) => {
    res.set("X-Api-Version", "1.0.0");
    res.send(`Blaze Api is an open source public rest api made by BlazeInferno64 \n Check https://github.com/blazeinferno64/blaze-api for more info`)
})

app.get("/github", (req, res) => {
    res.set("X-Api-Version", "1.0.0");
    res.redirect("https://github.com/blazeinferno64");
})


app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.set("X-Api-Version", "1.0.0");
    console.log(`Successfully sent data to the client!`);
    return res.send(html);
})

app.all("*",(req, res) => {
    res.status(404).send(`404 not found!`);
})


app.listen(PORT, () => {
    console.log(`Server is listening at port:${PORT}`);
})
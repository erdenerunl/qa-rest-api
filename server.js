const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
dotenv.config({
    path: "./configs/env/config.env"
});

connectDatabase();

const PORT = process.env.PORT;
const app = express();

app.use("/api", routers);

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}.`);
})

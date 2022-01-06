const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorsHandler");
dotenv.config({
    path: "./configs/env/config.env"
});


// MongoDb Connection
connectDatabase();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api", routers);


// Error Handler
app.use(customErrorHandler);

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}.`);
})

const express = require("express");
const dotenv = require("dotenv");
const connnectDB = require("./config/db");
const cors = require("cors");

// set up dotenv
dotenv.config();
// connect database
connnectDB();

const startServer = () => {
    const server = express();

    // middlewares
    server.use(cors())
    server.use(express.urlencoded({ extended: true }))
    server.use(express.json());

    // routes
    server.use("/", (req, res, next) => {
        setTimeout(() => {
            return next();
        }, 3000)
    })

    // CLIENT
    server.use("/api/users", require("./routes/api/user"));
    server.use("/api/auth", require("./routes/api/auth"));
    server.use("/api/content", require("./routes/api/content"));

    // ADMIN
    server.use("/api/admin", require("./routes/api/admin/content"));
    server.use("/api/admin", require("./routes/api/admin/users"));


    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}.`))
}

startServer();
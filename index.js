const express = require("express");

require("dotenv").config();


const { getPool } =
    require("./config/db");


const {
    connectRedis
} = require("./config/redis");


const vendorRoutes =
    require("./routes/vendorRoutes");


const riskComplianceRoutes =
    require("./routes/riskComplianceRoutes");


const errorHandler =
    require("./middleware/errorHandler");


const app = express();


/*
    Middleware
*/

app.use(express.json());


/*
    Health Check
*/

app.get("/health", (req, res) => {

    res.status(200).json({

        status: "OK",

        message:
            "Vendor Risk API is running"

    });

});


/*
    API Routes
*/

app.use(
    "/api/v1",
    vendorRoutes
);


app.use(
    "/api/v1",
    riskComplianceRoutes
);


/*
    Error Handler
*/

app.use(errorHandler);


/*
    Start Server
*/

const PORT =
    process.env.PORT || 5000;


const startServer = async () => {

    try {

        /*
            Connect to SQL Server
        */

        await getPool();


        /*
            Connect to Redis
        */

        await connectRedis();


        /*
            Start HTTP server
        */

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "Failed to start server:",
            error
        );

        process.exit(1);
    }

};


startServer();
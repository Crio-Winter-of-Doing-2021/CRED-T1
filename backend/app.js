const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const compression = require("compression");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const basicRoutes = require("./routes/basicRoutes");
const app = express();

app.use(cookieParser());

app.use(bodyParser.json())
app.use(compression())

// Used to enable the CROS origin policy
app.use(cors())

const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'CRED Api',
            description : "CRED Api information",
            contact : {
                name : "abhinav Singh"
            },
            servers: ["http://localhost:8000"]
        }
    },
    apis : ["./routes/*.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 2) ROUTE MIDDLEWARES
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.use('/',basicRoutes);

module.exports = app;
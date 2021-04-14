const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const compression = require("compression");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const basicRoutes = require("./routes/basicRoutes");
const cardRoutes = require("./routes/cardRoutes");
const statementRoutes = require("./routes/statementRoutes");
const viewRoutes = require("./routes/viewRoutes");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(express.bodyParser());
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


app.use('/',viewRoutes);
app.use('/api',basicRoutes);
app.use('/card',cardRoutes );
app.use('/statement', statementRoutes);
// app.use('*', viewRoutes);




module.exports = app;
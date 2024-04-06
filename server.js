import express from 'express'
import db from './db'
import cors from 'cors'
import logger from 'morgan'
import routes from './api/index'
import bodyParser from 'body-parser'
import swaggerUi from "swagger-ui-express"
import swaggerConfigWeb from './config/swagger-config-web'
require("dotenv").config({ path: './.env' })

const port = process.env.PORT ? process.env.PORT : 8000;
const app = express()

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(logger("dev"));

var options = {}

app.use(
    "/web-api-docs",
    swaggerUi.serveFiles(swaggerConfigWeb, options),
    swaggerUi.setup(swaggerConfigWeb)
)

//=========== All Routes ===========
app.use("/api", routes);

//=========== Test Route ===========
app.get('/', (req, res) => res.send(`<h1>iNotebook is working!</h1>`))

//========== App Listener =========
app.listen(port, () => console.log(`iNotebook app listening on port ${port}!`))

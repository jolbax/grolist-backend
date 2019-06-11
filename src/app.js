const express = require("express")
const app = express()
const appConfig = require("./config/app-config.js")
const routeConfig = require("./config/router-config.js")

appConfig.init(app, express)
routeConfig.init(app)

module.exports = app
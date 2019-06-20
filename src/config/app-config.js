require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passportConfig = require("./passport-config");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = {
  init(app, express) {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "test"
    ) {
      const logger = require("morgan");
      app.use(logger("dev"));
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    passportConfig.init(app);
    app.use(cors(corsOptions));
  }
};

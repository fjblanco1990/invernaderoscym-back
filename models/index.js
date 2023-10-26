const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.casos_exitosos = require("./casos-exitoso.model.js");
db.Users = require("./usuarios.model.js");

module.exports = db;
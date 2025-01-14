const Sequelize = require("sequelize");
require('dotenv').config();

const DATABASE= process.env.DATABASE;
const USER_DATABASE = process.env.USER_DATABASE;
const PASSWORD_DATABASE = process.env.PASSWORD_DATABASE;

let sequelize;
let database = process.env.DATABASE_URL || 'testedb'

if (process.env.DATABASE_URL) {
            sequelize = new Sequelize(database)
   } else {
    // localhost
    sequelize = new Sequelize(DATABASE, USER_DATABASE, PASSWORD_DATABASE, {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
    });
}

module.exports = sequelize;

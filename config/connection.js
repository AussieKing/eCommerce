// requiring the dotenv package to use the .env file
require("dotenv").config();
// requiring the sequilize model
const Sequelize = require("sequelize");
// once connected to the database, the sequelize instance will be saved in the variable sequelize
// if the app is deployed on Heroku, it will use the JAWSDB_URL environment variable, otherwise it will use the local database data
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );
// exporting the sequelize instance so that we can use it in other parts of the app
module.exports = sequelize;

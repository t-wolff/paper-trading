const mysql = require("mysql2");

const connectDB = async () => {
  try {
    const db = await mysql.createConnection({
      host:"localhost",
      user: "root",
      password: "password", 
      database: "paper-trading-db"
    });

    console.log(`MySQL Connected: ${db.config.host}`);
    return db;
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

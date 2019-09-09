const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const database = "fakenews";
class Database {
  constructor() {
    this._connect();
    this.connection = mongoose.connection;
  }
  _connect() {
    mongoose
      .connect(`${URI}/${database}`)
      .then(() => {
        console.log("Successfully connects to MongoDB.");
      })
      .catch(err => {
        console.error("Failed to connect to MongoDB");
        console.log(err);
      });
  }
  _close() {
    this.connection.close();
  }
}

module.exports = new Database();

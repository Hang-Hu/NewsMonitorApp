const NewsModel = require("./models/news");
const DB = require("./database");
const fs = require("fs");
const path = require("path");

const newsArr = JSON.parse(fs.readFileSync(path.join(__dirname, "04-12.json")));
for (let i = 0; i < newsArr.length; i++) {
  // newsArr[i].date = "2019-04-07";
  let newsInstance = new NewsModel(newsArr[i]);
  newsInstance
    .save()
    .then(doc => {
      console.log(`${i} written to MongoDB.`);
      DB._close();
    })
    .catch(err => {
      console.error(err);
      DB._close();
    });
}

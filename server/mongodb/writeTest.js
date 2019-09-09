const NewsModel = require("./models/news");
const DB = require("./database");
const fs = require("fs");
const path = require("path");

const newsArr = JSON.parse(fs.readFileSync(path.join(__dirname, "first.json")));
for (let i = 0; i < newsArr.length; i++) {
  let newsInstance = new NewsModel(newsArr[i]);
  newsInstance
    .save()
    .then(doc => {
      console.log(doc);
      DB._close();
    })
    .catch(err => {
      console.error(err);
      DB._close();
    });
}

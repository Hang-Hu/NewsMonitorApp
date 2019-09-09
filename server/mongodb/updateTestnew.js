const NewsModel = require("./models/news");
const DB = require("./database");
const fs = require("fs");
const path = require("path");

const newsArr = JSON.parse(
  fs.readFileSync(path.join(__dirname, "2019-04-07-news.json"))
);
for (let i = 0; i < newsArr.length; i++) {
  NewsModel.find({ news_id: newsArr[i].news_id })
    .then(doc => {
      doc = doc[0];
      console.log(`Fetched from MongoDB with news_id ${newsArr[i].news_id}`);
      for (let prop in newsArr[i]) {
        if (prop !== "news_id") {
          doc[prop] = newsArr[i][prop];
        }
      }
      doc
        .save()
        .then(doc => {
          console.log(`Written to MongoDB with news_id ${newsArr[i].news_id}`);
          if (i === newsArr.length - 1) {
            DB._close();
          }
        })
        .catch(err => {
          console.error(err);
          DB._close();
        });
    })
    .catch(err => {
      console.error(err);
      DB._close();
    });
}

const NewsModel = require("../mongodb/models/news");
const HeatMapImgModel = require("../mongodb/models/heatmapimg");

exports.findOneByNewsId = (req, res) => {
  NewsModel.find({ news_id: req.params.newsId })
    .then(news => {
      if (!news) {
        return res.status(404).send({
          message: `News not found with id ${req.params.newsId}`
        });
      } else {
        return res.send(news[0]);
      }
    })
    .catch(err => {
      console.error(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `News not found with id ${req.params.newsId}`
        });
      } else {
        return res.status(500).send({
          message: `Something wrong retrieving news with id ${
            req.params.newsId
          }`
        });
      }
    });
};

exports.findAllByDate = (req, res) => {
  NewsModel.find({ date: new Date(req.params.date) }, { news_id: 1, _id: 0 })
    .then(news => res.send(news.map(item => item.news_id)))
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something wrong with findAllByDate."
      });
    });
};

exports.findAllDates = (req, res) => {
  NewsModel.distinct("date")
    .then(news => {
      res.send(news.sort((a, b) => new Date(b) - new Date(a)));
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something wrong with findAllDates."
      });
    });
};

exports.findTweetIdByNewsId = (req, res) => {
  NewsModel.find({ news_id: req.params.newsId }, { _id: 0, tweet_url: 1 })
    .then(news => {
      let tweetUrl = news[0].tweet_url;
      res.send({
        tweet_id: tweetUrl.slice(tweetUrl.lastIndexOf("/") + 1, tweetUrl.length)
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something wrong with findTopNTweetsByNewsId."
      });
    });
};

exports.findHeatMapImgByNewsId = (req, res) => {
  HeatMapImgModel.find({ news_id: req.params.newsId })
    .then(doc => {
      // res.contentType()
      let decoded = Buffer.from(doc[0].image, "base64").toString("ascii");
      res.send([decoded]);
      // res.send("iVBORw0K");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something wrong with findHeatMapImgByNewsId."
      });
    });
};

let findMostPopularByDate = date => {
  return NewsModel.find({ date: new Date(date) }, { news_id: 1, _id: 0 })
    .sort({ favorite_count: -1 })
    .limit(1)
    .then(news => news[0])
    .catch(err => {
      console.error(err);
    });
};
exports.findMostPopularNewsInfoByDate = (req, res) => {
  findMostPopularByDate(req.params.date).then(id => {
    NewsModel.find(
      { news_id: id.news_id },
      { _id: 0, news_image: 1, news_url: 1, news_title: 1, news_id: 1 }
    )
      .then(doc => {
        res.send(doc[0]);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something wrong with findMostPopularNewsInfoByDate."
        });
      });
  });
};

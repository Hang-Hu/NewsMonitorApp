const mongoose = require("mongoose");
// const validator = require("validator");

const newsSchema = new mongoose.Schema({
  news_id: {
    type: String,
    unique: true,
    required: true
  },
  news_keyword: String,
  news_url: String,
  news_tokens: String,
  favorite_count: Number,
  tweets_tokens: String,
  comment_time: String,
  weighted_sentiment_score: Number,
  date: Date,
  news_title: String,
  prediction: String,
  favorite_count: Number,
  tweets_comment: [String],
  like_counts: [Number],
  news_text: String,
  news_image: String,
  tweet_url: String
});

module.exports = mongoose.model("news", newsSchema);

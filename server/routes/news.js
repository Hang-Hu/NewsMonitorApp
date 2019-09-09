var express = require("express");
var router = express.Router();
const NewsController = require("../controllers/news");

/* GET news listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource in news.");
// });

router.get("/all/date/:date", NewsController.findAllByDate);
router.get("/one/:newsId", NewsController.findOneByNewsId);
router.get(
  "/one/popular/date/:date",
  NewsController.findMostPopularNewsInfoByDate
);
router.get("/all/dates", NewsController.findAllDates);
router.get("/one/news/:newsId/tweet", NewsController.findTweetIdByNewsId);
router.get("/one/news/:newsId/heatmap", NewsController.findHeatMapImgByNewsId);

module.exports = router;

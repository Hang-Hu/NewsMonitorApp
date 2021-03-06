var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// if NODE_ENV not specified then it's production
const NODE_ENV = process.env.NODE_ENV || "production";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newsRouter = require("./routes/news");

var app = express();

// Even DB won't be used, it actually initiate MongoDB connection and is used by future calls to MongoDB
const DB = require("./mongodb/database");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/news", newsRouter);

if (NODE_ENV == "production") {
  console.log("Serve front end files in production.");
  // serve front end files
  app.use(express.static(path.join(__dirname, "../client/build")));
  // /* is used to capture client routing like news/news_id
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

# NewsMonitorApp

<a href="https://news-monitor-app.herokuapp.com" target="_blank"><img src="https://heroku-badge.herokuapp.com/?app=news-monitor-app" alt="heroku badge" /></a>

[Heroku Link](https://news-monitor-app.herokuapp.com){:target="_blank"}

News Monitor App is a web app that displays the news content, word cloud of the news and related twitter comments, and the comments frequency each hour.

## Development

Set `NODE_ENV=development` and `MONGODBURI` in `.env`, run `heroku local`.

## Deployment

Set config vars.

```
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb-uri" // if not set then will use local MongoDB with port 27017
```

Push to heroku

```
git add .
git commit -m "MESSAGE"
git push heroku master
```

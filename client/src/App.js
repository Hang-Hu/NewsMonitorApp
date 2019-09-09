import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TimeLine from "./timeline/TimeLine";
import NewsPage from "./news/NewsPage";
import NewsBundlePage from "./bundle/NewsBundlePage";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./homepage/HomePage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/bundle/:date" component={NewsBundlePage} />
          <Route path="/news/:newsId" component={NewsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import { CssBaseline } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { RoadmapPage } from "./pages/RoadmapPage/RoadmapPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes } from "./service/config";
import "./App.css";
import { ViewPdf } from "./components/Tasks/ViewPdf/ViewPdf";
import { RecentRoadmaps } from "./components/Roadmaps/RecentRoadmaps/RecentRoadmaps";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log(token);
    return <LoginPage />;
  }
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <Toolbar />
          <Switch>
            <Route path={`${Routes.boards}/:id`} component={RoadmapPage} />
            <Route path={`${Routes.join}/:id`} component={HomePage} />
            <Route path={`${Routes.explore}`} component={RecentRoadmaps} />
            <Route exact path="/*" component={HomePage} />
            <Route path={`${Routes.boards}/:description`} component={ViewPdf} />
            {/* <Route path={`${Routes.pdf}/:description`} component={ViewPdf} /> */}
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
}

export default App;

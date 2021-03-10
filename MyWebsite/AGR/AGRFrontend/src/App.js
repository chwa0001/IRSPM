import React, { Component, Fragment, Suspense} from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { render } from "react-dom";

import SecondHomePage from "./SecondHomePage";
import SignUp from "./SignUp";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import Pace from "./components/Pace";
import SignIn from "./SignIn";
import ResetPassword from './ResetPassword';
import TestWebpage from './Test';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/SecondHome" component={SecondHomePage}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/Reset" component={ResetPassword}/>
            <Route exact path="/Test" component={TestWebpage}/>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>

    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);


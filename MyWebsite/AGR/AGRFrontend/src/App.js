import React, { Component, Fragment, Suspense} from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { render } from "react-dom";

import HomePage from "./HomePage";
import SignUp from "./SignUp";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import Pace from "./components/Pace";
import SignIn from "./SignIn";
import ResetPassword from './ResetPassword';
import UserDataPage from './UserData';
import ExerciseRatingPage from './ExerciseRating';
import AccountData from './AccountData';
import MuscleBuildingPage from './MuscleBuildingPage';
import ExerciseSetPage from './ExerciseSetPage';
import ModeSelection from "./ModeSelection";
import MenuBar from './components/MenuBar';
import Container from '@material-ui/core/Container';
import CustomScroller from 'react-custom-scroller';
import ExerciseBuddytest from './ExerciseBuddy';

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
            <Route exact path="/"  component={SignIn}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/Reset" component={ResetPassword}/>
            <div style={{flexGrow:1}}>
            <CustomScroller style={{ width: '100%', height: '100%' }}>
            <MenuBar/>
            <Container component="main" maxWidth="md" style={{maxHeight: "90vh", overflow: 'auto'}}>
              <Route exact path="/Home" component={HomePage}/>
              <Route exact path="/UserData" component={UserDataPage}/>
              <Route exact path="/ExerciseRating" component={ExerciseRatingPage}/>
              <Route exact path="/AccountData" component={AccountData}/>
              <Route exact path="/MuscleBuilding" component={MuscleBuildingPage}/>
              <Route exact path="/ExerciseSet" component={ExerciseSetPage}/>
              <Route exact path="/ModeSelection" component={ModeSelection}/>
              <Route exact path="/ExerciseBuddy" component={ExerciseBuddytest}/>
            </Container>
            </CustomScroller>
            </div>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);


import React from 'react';
import Cookies from 'js-cookie';
import {makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Card from '@material-ui/core/Card';
import MenuBar from './components/MenuBar';
import CustomScroller from 'react-custom-scroller';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  paper: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  Images:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  let history = useHistory()
  const username = Cookies.get('username');
  return (
        <div className={classes.paper}>
          <Card>
          </Card>
        </div>
  );
}
import React from 'react';
import Cookies from 'js-cookie';
import {useLocation,useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

export default function Album() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let history = useHistory()
  const username = Cookies.get('username')
  function GetModel(username) {
    if (username!=''){
    fetch(`/AGR/AskModelToLearn?username=${username}`)
        .then(response => response.json())
        .then(
          (data) => {console.log(data)},
          (error) => {alert(error)}
        )
        }
    else{
      if(username==''){alert('Username is not detected!')}
    }
    }
  function GoBack()
  {
    Cookies.remove('username')
    history.push('/')
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography>
            {username}
          </Typography>
        </Toolbar>
      </AppBar>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() =>GetModel(username) }
          >
            GetUserData
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() =>GoBack() }
          >
            Logout
        </Button>
      <Toolbar>
        <Typography>
          Footer
        </Typography>
        <Typography>
          Something here to give the footer a purpose!
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
}
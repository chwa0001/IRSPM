import React,{ useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import {makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  }
}));

export default function HomePage() {
  const classes = useStyles();
  let history = useHistory()
  const username = Cookies.get('username');
  Cookies.set('PageName', "Advance Gym Recommender");

  return (
        <div className={classes.paper}>
          <Card variant="outlined">
            <CardContent>
              <Grid>
              <Typography variant="h5" component="h2">
                Recommender Mode
              </Typography>
              <Typography color="textSecondary">
                View Your Recommended Exercises
              </Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small">Select the mode</Button>
            </CardActions>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Recommender Mode
              </Typography>
              <Typography color="textSecondary">
                View Your Recommended Exercises
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Select the mode</Button>
            </CardActions>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Recommender Mode
              </Typography>
              <Typography color="textSecondary">
                View Your Recommended Exercises
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Select the mode</Button>
            </CardActions>
          </Card>
        </div>
  );
}
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
    marginTop: theme.spacing(3),
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
  Cookies.set('PageName', "Advanced Gym Recommender");

  return (
    <div className={classes.paper}>
      <Grid container direction="column" alignContent='right' alignItems='right'>
        <Grid container direction="column">
          <Card variant="outlined" style={{width:300,height:140}}>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5" component="h2">
                    Mode Selection
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    Choose Your Exercise Mode
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{history.push('/ModeSelection')}}>Select the mode</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" style={{width:300,height:140}}>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5" component="h2">
                    Glossary
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    View All Exercises
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{history.push('/Glossary')}}>View it now</Button>
            </CardActions>
          </Card>
          </Grid>
          <Grid container direction="column">
          <Card variant="outlined" style={{width:300,height:140}}>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5" component="h2">
                    Exercise Buddy
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    View Your Buddy
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{history.push('/ExerciseBuddy')}}>CHeck it out</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" style={{width:300,height:140}}>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5" component="h2">
                    Exercise Rating
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    Rate Your Exercise
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{history.push('/ExerciseRating')}}>Start To Rate</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid container direction="row">
          <Card variant="outlined" style={{width:300,height:140}}>
            <CardContent>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h5" component="h2">
                    Past Set Exercises
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    View Past Exercises
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{history.push('/ExerciseSets')}}>View it now</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
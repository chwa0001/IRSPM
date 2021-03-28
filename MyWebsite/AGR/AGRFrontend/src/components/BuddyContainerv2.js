import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/DefaultProfilePic.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs> 
                <Typography gutterBottom variant="subtitle1">
                  Profile
                </Typography>
                <Grid item xs={12} container spacing={3}>
                <Grid item xs={3}>
                <Typography variant="body2" gutterBottom>
                  Age:
                </Typography>
                </Grid>
                <Grid item>
                <Typography variant="body2" gutterBottom>
                  25
                </Typography>
                </Grid> 
                </Grid>
                <Grid item xs={12} container spacing={3}>
                <Grid item xs={3}>
                <Typography variant="body2" gutterBottom>
                  Gender:
                </Typography>
                </Grid>
                <Grid item>
                <Typography variant="body2" gutterBottom>
                  Male
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}>
                <Grid item xs={3}> 
                <Typography variant="body2" gutterBottom>
                  Goal:
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}>
                <Grid item xs={3}>
                <Typography variant="body2" gutterBottom>
                  Distance:
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}> 
                <Grid item xs={3}>
                <Typography variant="body2" gutterBottom>
                  Fitness:
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}> 
                <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Recommended Exercises:
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}> 
                <Grid item xs={3}>
                <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/8.jpg" />
                </Grid>
                <Grid item xs={3}>
                <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/56.jpg" />
                </Grid>
                <Grid item xs={3}>
                <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/28.jpg" />
                </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
            <ButtonBase>
              <Typography variant="subtitle1"> + Add User</Typography>
            </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
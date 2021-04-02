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

export default function ExBuddyGrid(props) {
  const classes = useStyles();

  function FormRow(rowdata) {
    return (
      <React.Fragment>
      <Grid item xs={3}>
        <Typography gutterBottom variant={rowdata.type}>
          {rowdata.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" gutterBottom>
          {rowdata.value}
        </Typography>
      </Grid>
      </React.Fragment>
    );
  }

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
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"subtitle1"} name={'User ID'} value={props.userid}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Age:'} value={props.age}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Gender:'} value={props.gender}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Goal:'} value={props.goal}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Distance:'} value={''}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Fitness:'} value={props.fitness}/>
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

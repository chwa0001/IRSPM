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

export default function ExGroupGrid(props) {
  const classes = useStyles();
  const pre = '/AGRFrontend/static/images/'
  const post = '.jpg'
  const exerciselist = props.exerciselist

  function FormRow(rowdata) {
    return (
      <React.Fragment>
      <Grid item xs={3}>
        <Typography gutterBottom variant={rowdata.type}>
          {rowdata.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={rowdata.type} gutterBottom>
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
              <img className={classes.img} alt="complex" src={props.grouppic} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs> 
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"subtitle1"} name={'Group Name'} value={props.grpname}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Group ID:'} value={props.grpid}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Group size:'} value={props.grpsize}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Group limit:'} value={props.grplimit}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Training days:'} value={props.grpdays}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Goal:'} value={props.grpgoal}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Fitness:'} value={props.grpfitness}/>
              </Grid>
                <Grid item xs={12} container spacing={3}> 
                <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Recommended Exercises:
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}> 

                {exerciselist.map((exercise) => ( 

                <Grid item xs={3} >
                {/* <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/56.jpg" /> */}
                <img className={classes.img} alt="complex" src={pre.concat(exercise,post)} />
                </Grid>
                ))} 

                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            
            </Grid>
            <Grid item>
            <Grid item container direction="column" spacing={2}>
            <ButtonBase>
              <Typography variant="subtitle1"> + Join Group</Typography>
            </ButtonBase>
            <ButtonBase>
              <Typography variant="subtitle1"> + Invite Trainer</Typography>
            </ButtonBase>
            </Grid>
            </Grid>  
            </Grid>          
        </Grid>
      </Paper>
    </div>
  );
}

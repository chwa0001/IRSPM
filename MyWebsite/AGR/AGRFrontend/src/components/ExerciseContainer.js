import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 800,
    maxWidth: '90%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '30%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  flexcontainer: {
    display: 'flex',
    flexWrap: 'wrap',
    fontWize: 30,
    textAlign: 'center',
  },
  flexitemleft: {
    backgroundcolor: '#f1f1f1',
    padding: 10,
    flex: '50%',
  },
  flexitemright: {
    backgroundcolor: 'dodgerblue',
    padding: 10,
    flex: '50%',
  },
}));

export default function ExerciseContainer(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid alignContent="center" alignItems="center" justify="center">
      <Card className={classes.root}>
        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        >
          <CardContent>
            <Typography component="h2" variant="h2">
              {props.exercise_name}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
      <Card className={classes.root}>
        <CardMedia
        className={classes.cover}
        image={props.img1}
        />
        <CardMedia
        className={classes.cover}
        image={props.img2}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h4" variant="h4">
              Main Muscle: {props.main_muscle}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Detail Muscle: {props.detail_muscle}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Other Muscle: {props.other_muscle}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Type: {props.type}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Mechanics: {props.mechanics}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Equipment: {props.equipment}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Difficulty: {props.difficulty}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Exercise Guide: 
            </Typography>
            <Typography variant="body" color="textSecondary">
              {props.Instructions}
            </Typography>
          </CardContent>
        <div className={classes.controls}>
          <Typography component="h5" variant="h5">
            Live From Space 2
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller 2
          </Typography>
        </div>
      </div>
    </Card>
  </Grid>
  );
}

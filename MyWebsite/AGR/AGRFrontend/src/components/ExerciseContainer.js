import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    // minWidth: 600,
    maxWidth: '100%',
    alignContent: "center",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    maxWidth: 600,
  },
  content: {
    flex: '1 0 auto',
  },
  pictures: {
    minWidth: 150,
    width: '35%',
  },
  table: {
    minWidth: 300,
  },
}));


export default function ExerciseContainer(props) {
  const classes = useStyles();
  const theme = useTheme();
  
  function createData(name, details) {
    return { name, details };
  }
  const rows = [
    createData('Main Muscle', props.main_muscle),
    createData('Detail Muscle', props.detail_muscle),
    createData('Other Muscle', props.other_muscle),
    createData('Type', props.type),
    createData('Mechanics', props.mechanics),
    createData('Equipment', props.equipment),
    createData('Difficulty', props.difficulty),
    createData('Exercise Guide', props.Instructions),
  ]

  return (
    <Grid 
    alignContent="center" 
    alignItems="center" 
    justify="center" 
    paddingBottom={30}
    justify-content='center'
    flex-direction= 'row'
    >
      <Card className={classes.root}>
        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        flex-grow= {2}
        >
          <CardContent>
            <Typography component="h1" variant="h1">
              {props.exercise_name}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
      <Card className={classes.root}>
        <CardMedia
        className={classes.pictures}
        image={props.img1}
        />
        <CardMedia
        className={classes.pictures}
        image={props.img2}
        />
        <div className={classes.details}>
          {/* <CardContent className={classes.content}> */}
            {/* <Typography component="h4" variant="h4">
              Main Muscle: {props.main_muscle}
            </Typography> */}
            {/* <Typography variant="h5" color="textSecondary">
              Mechanics: {props.mechanics}
            </Typography> */}
          {/* </CardContent> */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {(rows).map((row) => (
                <TableRow key={row.name}>
                  <TableCell style={{ width: 30, fontSize: 16 }} variant="head" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ fontSize: 13 }} align="left">
                    {row.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Card>
    <Card className={classes.root}>
        <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        >
          <CardContent>
            <Typography component="h2" variant="h2">
              _________________________________________________________________________________
            </Typography>
          </CardContent>
        </Grid>
      </Card>
  </Grid>
  );
}

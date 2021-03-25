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
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import { sizing } from '@material-ui/system';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
    // minWidth: 600,
    maxWidth: '100%',
    alignContent: "center",
    justifyContent: "center",
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    // minWidth: 600,
    maxWidth: '100%',
    // height: '60%',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
  content: {
    flex: '1 0 auto',
  },
  pictures: {
    width: '100%',
  },
  container:{
    alignContent: "center",
    alignItems: "center",
  },
  sizeSmall:{
    width: 5,
    alignContent: "left",
  },
  paper: {
    marginTop: theme.spacing(3),
    alignContent: "center",
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


export default function ExerciseContainer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
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
    <Card className={classes.paper}>
      <CardContent>
        <Typography component="h5" variant="h5" align='center'>
          {props.exercise_name}
        </Typography>
      </CardContent>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.root} aria-label="collapsible table">
          <TableBody>
            {(rows).map((row) => (
                <React.Fragment>
                  <TableRow key={row.name}>
                    <TableCell />
                    <TableCell style={{ width: 100, fontSize: 16 }} variant="head">
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 600, fontSize: 13 }} align="left">
                      {row.details}
                    </TableCell>
                  </TableRow>
                  </React.Fragment>
                ))}
            <TableRow>
              <TableCell scope="row" align="left" size="small" width={5} alignContent="left">
                  <IconButton width={5} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid container spacing={3} direction='row' justify="center"  alignItems="center">
          <Grid item xs={12} sm={6}>
            <CardMedia
              style = {{ height: 100, paddingTop: '90%'}}
              image={props.img1}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardMedia
                style = {{ height: 100, paddingTop: '90%'}}
                image={props.img2}
                />
          </Grid>
        </Grid>
        <CardContent className={{marginBottom:'10%'}}></CardContent>
      </Collapse>
    </Card>

  );
}

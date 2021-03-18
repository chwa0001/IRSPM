import React from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './_ExData';
import FiveRadioButtons from './components/ExerciseRaitingRadio';
import MenuBar from './components/MenuBar'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { green, red } from '@material-ui/core/colors';

import { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomScroller from 'react-custom-scroller';
import { Backdrop } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  table: {
    minWidth: 300,
  },

}));

export default function HomePage() {
  const classes = useStyles();
  const username = Cookies.get('username');

  const GetModel =(username)=> {
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

  return (
    
    <div className={classes.grow}>
      <MenuBar/>
      <Grid container={5}>
        <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() =>GetModel(username) }
        >
          GetUserDataTest
        </Button>
        <div style={{ fontSize: 14 }}>
          <p>Rate the exercises that you have done for AGR to give a more personalised recommendation, just for you!</p>
          <p>Choose the radio button below with red (left) as need improvement and Green (right) as great!  </p>
        </div>
      </Grid>
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        <div 
        display= 'flex'
        fullWidth 
        cellHeight='auto' 
        display= 'grid'
        justify-content='center' 
        align-content= 'center'
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: 25 }} variant="h1" scope="row">
                    Exercises
                  </TableCell>
                  <TableCell style={{ fontSize: 25 }} variant="h1" scope="row" align="center">
                    Raiting
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tileData.map((tile) => (
                  <TableRow key={tile.exercise_name}>                    
                    <TableCell style={{ fontSize: 18 }} variant="h2" scope="row">
                      {tile.exercise_name}
                    </TableCell>
                    <TableCell style={{ fontSize: 13 }} align="center">
                      <FiveRadioButtons/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Scrollbars>
    </div>
  );
}
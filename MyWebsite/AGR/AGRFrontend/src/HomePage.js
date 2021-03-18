import React from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './_ExData';
import ExerciseContainer from './components/ExerciseContainer';
import MenuBar from './components/MenuBar'

import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: '100%',
    height: '100%',
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
      </Grid>
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        {/* !! not sure how to make it centered yet */}
        <GridList 
          fullWidth 
          cellHeight='auto' 
          display= 'grid'
          justify-content='center' 
          align-content= 'center'
          >
          {tileData.map((tile) => (
            <ExerciseContainer img1= {tile.img1} img2= {tile.img2} exercise_name= {tile.exercise_name} main_muscle= {tile.main_muscle} detail_muscle= {tile.detail_muscle} other_muscle= {tile.other_muscle} type= {tile.type} mechanics= {tile.mechanics} equipment= {tile.equipment} difficulty= {tile.difficulty} Instructions= {tile.Instructions}/>
          ))}
        </GridList>
      </Scrollbars>
    </div>
  );
}
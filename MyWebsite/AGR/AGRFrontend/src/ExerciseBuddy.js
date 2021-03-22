import React from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './_ExData';
import ExerciseContainer from './components/ExerciseContainer';
import MenuBar from './components/MenuBar';
import CustomScroller from 'react-custom-scroller';
// import { DataGrid, GridToolbar } from '@material-ui/data-grid';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const riceFilterModel = {
    items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
  };


export default function ExerciseBuddytest() {
    const classes = useStyles();

    return (
    <div className={classes.grow}>
        <MenuBar/>
        <Button variant="contained" color="primary">
            Hello World!!
        </Button>
        {/* <DataGrid
        {...data}
        filterModel={riceFilterModel}
        components={{
          Toolbar: GridToolbar,
        }}
        /> */}
    </div>
        
      );
}




function ExerciseBuddy() {
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
      <Grid>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() =>GetModel(username) }
          >
            GetUserDataTest
        </Button>
      </Grid>
      <CustomScroller style={{ width: '100%', height: '100%' }}>
        {/* !! not sure how to make it centered yet */}
        <GridList 
          fullWidth 
          // cellHeight='auto' 
          display= 'grid'
          justify-content='center' 
          align-content= 'center'
          >
          {tileData.map((tile) => (
            <ExerciseContainer img1= {tile.img1} img2= {tile.img2} exercise_name= {tile.exercise_name} main_muscle= {tile.main_muscle} detail_muscle= {tile.detail_muscle} other_muscle= {tile.other_muscle} type= {tile.type} mechanics= {tile.mechanics} equipment= {tile.equipment} difficulty= {tile.difficulty} Instructions= {tile.Instructions}/>
          ))}
        </GridList>
      </CustomScroller>
    </div>
  );
}

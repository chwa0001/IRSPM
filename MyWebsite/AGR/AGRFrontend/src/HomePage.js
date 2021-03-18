import React from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './tileData';
import ExerciseContainer from './components/ExerciseContainer';
import MenuBar from './components/MenuBar';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: 800,
    height: 800,
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
      <GridList cellHeight={800} className={classes.gridList} cols={10}>
        {tileData.map((tile) => (
          <ExerciseContainer image={tile.img} title={tile.title}/>
        ))}
      </GridList>
    </div>
  );
}
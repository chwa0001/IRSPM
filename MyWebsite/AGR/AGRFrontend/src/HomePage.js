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
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const username = Cookies.get('username');

  return (
    <div className={classes.grow}>
      <MenuBar/>
      <Container component="main" maxWidth="md" style={{maxHeight: "90vh", overflow: 'auto'}}>
      <CustomScroller style={{ width: '100%', height: '100%' }}>
      <CssBaseline />
          {tileData.map((tile) => (
            <ExerciseContainer img1= {tile.img1} img2= {tile.img2} exercise_name= {tile.exercise_name} main_muscle= {tile.main_muscle} detail_muscle= {tile.detail_muscle} other_muscle= {tile.other_muscle} type= {tile.type} mechanics= {tile.mechanics} equipment= {tile.equipment} difficulty= {tile.difficulty} Instructions= {tile.Instructions}/>
          ))}
      </CustomScroller>
      </Container>

    </div>
  );
}
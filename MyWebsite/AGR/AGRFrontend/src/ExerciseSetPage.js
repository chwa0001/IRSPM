import React,{useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";

import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './_ExData';
import ExerciseContainer from './components/ExerciseContainer';
import MenuBar from './components/MenuBar';
import CustomScroller from 'react-custom-scroller';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

}));

export default function ExerciseSetPage() {
  console.log(Cookies.get());
  const classes = useStyles();
  const username = Cookies.get('username');
  const latest_set = Cookies.get('setId');
  console.log(latest_set);
  console.log(username);

  const [mode, setMode] = useState('');
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState('');
  const pre = '/AGRFrontend/static/images/'
  const post = '.jpg'
  console.log(pre.concat(latest_set,post))

  let history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);

  React.useEffect(()=> {

    console.log("react response - UseEffect")

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        set_id: latest_set,
        }),
      };

      if (username!=''){
      fetch('/AGR/GetSetDetails', requestOptions)
        .then(function(response){
          console.log(response)
          if (!response.ok){
            throw new Error('Response not OK');
          }
          else{
            return response.json();
          }
        }).then(
          (data) => {
            console.log(data);
            setDate(data.set_date); 
            setMode(data.set_type);
            setExercises(data.exercises_details);
            setUserStatus(data.status)
            console.log(data.set_date); 
            console.log(data.set_type);
            console.log(data.exercises_details);
            console.log(data.status)
          },
        )
      }

  }, []);  

  return (
    <div className={classes.grow}>
      <MenuBar/>
      <Container component="main" maxWidth="md" style={{maxHeight: "90vh", overflow: 'auto'}}>
        <div className={classes.paper}>
          <Grid container 
          spacing={2}
          className={classes.text}
          >
            <Grid item xs={12}>
              <Typography component="h4" variant="h4"> 
                <b>Set Type: {mode}</b>
              </Typography>
              <Typography component="h5" variant="h5"> 
                <i>Exercise Date: {date}</i>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <CustomScroller style={{ width: '100%', height: '100%' }}>
        <CssBaseline />
        {exercises.map((tile) => (
          <ExerciseContainer 
          img1= {pre.concat(tile.pic_no[0],post)} 
          img2= {pre.concat(tile.pic_no[1],post)} 
          exercise_name= {tile.exercise_name} 
          main_muscle= {tile.main_musclegroup} 
          detailed_musclegroup= {tile.detail_muscle} 
          other_muscle= {tile.other_musclegroups} 
          type= {tile.exercise_type} 
          mechanics= {tile.mechanics} 
          equipment= {tile.equipment} 
          difficulty= {tile.difficulty} 
          Instructions= {tile.instruction_text}/>
        ))}
        </CustomScroller>
      </Container>

    </div>
  );
}
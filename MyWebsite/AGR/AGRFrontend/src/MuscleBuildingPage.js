import React ,{ useState , useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuBar from './components/MenuBar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Advance Gym Recommender (AGR) 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SecondInstruction(listExercise) {
  if (listExercise != []) {
    return (
      <Typography component="h5" variant="h5"> 
        <i>Soon to come</i>
      </Typography>
    );
  } else {
    return (
      <Typography component="h5" variant="h5"> 
        <i>To get started, choose your prefered exercise.</i>
      </Typography>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: '#8eb8ad',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  backbutton: {
    backgroundColor: '#f20a40',
    color: 'white',
    height: 36,
  },
  text: {
    // outlineColor: '#8eb8ad',
  },
  submitbutton:{
    backgroundColor:"#0a57f2",
    color: 'white',
    height: 36,
  },
  buttongrouping:{
    padding: '90px 15px',
  },
  submitbutton2:{
    backgroundColor:"#0a57f2",
    color: 'white',
    height: 36,
  },
  buttongrouping2:{
    padding: '3px 15px',
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));



export default function UserDataPage() {
  const classes = useStyles();
  const username = Cookies.get('username')
  console.log(username)
  // console.log(Cookies.get())

  const [muscle,setMuscle] = useState(' ');
  const [listExercise,setListExercise] = useState([]);
  const musclechoices = ['Forearm','Shoulders','Triceps','Upper Legs','Lower Legs','Cardio','Chest','Back','Biceps','Abs', 'Glutes']
  const [preference,setPreference] = useState('')
  const [exercise1,setExercise1] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [exercise2,setExercise2] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [exercise3,setExercise3] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [exercise4,setExercise4] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})

  const history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);
  const [open, setOpen] = React.useState(false);


  // React.useEffect(()=> {

  //   console.log("react response - UseEffect")

  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         username:username,
  //         }),
  //       };
  //       if (username!=''){
  //       fetch('/AGR/GetUserData', requestOptions)
  //         .then(function(response){
  //           console.log(response)
  //           if (!response.ok){
  //             throw new Error('Response not OK');
  //           }
  //           else{
  //             return response.json();
  //           }
  //         }).then(
  //           (data) => {
  //             console.log(data.gender)
  //             setLocation(data.location);
  //           },
  //         )
  //       }

  // }, []);  
   

  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Account has been updated!');
      history.push('/Home');
    }
  }, [userStatus])


  function getExercise4Muscle(muscle) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          muscle:muscle,
        }),
    };
    console.log(requestOptions);
    if (muscle!=' '){
    fetch('/AGR/GetExercise4Muscle', requestOptions)
        .then(function(response){
          if (!response.ok){
            throw new Error('Response not OK');
          }
          else{
            return response.json();
          }
        }).then(
          (data) => {
            setListExercise(data.exercises);
            setUserStatus(data.status);
            setExercise1(data.exercises[0]);
            setExercise2(data.exercises[1]);
            setExercise3(data.exercises[2]);
            setExercise4(data.exercises[3]);
            console.log(data.exercises);
            console.log(listExercise);
            // console.log(listExercise[0].id);
          },
          (error) => {alert(error)}
        )
      }
    else{
      if(muscle==' ') {alert('Choose a mucle group to get started!')}
    }
  }
  
  const muscleHandleChange = (event) => {
    setMuscle(event.target.value);
    console.log(muscle)
  };

  const preferenceHandleChange = (event) => {
    setPreference(event.target.value);
  }

  return (
      <div className={classes.grow}>
        <MenuBar/>
        <CssBaseline />
        
        <Container component="main" maxWidth="md" style={{maxHeight: "90vh", overflow: 'auto'}}>
        <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container 
          spacing={2}
          className={classes.text}
          >
            <Grid item xs={12}>
              <Typography component="h4" variant="h4"> 
                <b>Muscle Building</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h5" variant="h5"> 
                <i>1. To get started, choose a targeted muscle group</i>
              </Typography>
              <FormControl 
              fullWidth='true'
              className={classes.formControl}
              >
                <InputLabel id="muscle">Targeted Muscle</InputLabel>
                <Select
                  labelId="muscle"
                  id="muscle"
                  value={muscle}
                  onChange={muscleHandleChange}
                  // component="h5" 
                  // variant="h5"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {musclechoices.map( (item) =>
                    <MenuItem value={item}>{item}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <ButtonGroup 
                disableElevation 
                variant="contained" 
                width='20vw'
                className={classes.buttongrouping2}
                >
                <Button
                  className={classes.submitbutton2}
                  endIcon={<TrendingFlatIcon />}
                  color="secondary"
                  onClick={() => getExercise4Muscle(muscle)}
                >
                  Generate exercises next!
                </Button>
              </ButtonGroup>

            </Grid>
              <Typography display='block' component="h5" variant="h5" > 
                <p><i>2. Choose your preffered exercise</i></p>
              </Typography>
            <Grid container xs={12}>
              <FormControl component="fieldset" alignContent="center" justifyContent="center">
                <FormLabel component="legend">Click on the exercises to get more details</FormLabel>
                
                <RadioGroup 
                aria-label="Prefered excercise" 
                name="Prefered excercise" 
                value={preference} 
                onChange={preferenceHandleChange}
                onClick={preferenceHandleChange}
                orientation='vertical'
                >
                  <FormControlLabel
                  value={exercise1.id}
                  control={<Radio/>}
                  label={exercise1.exercise_name}
                  labelPlacement="right"
                  />
                  <FormControlLabel
                  value={exercise2.id}
                  control={<Radio/>}
                  label={exercise2.exercise_name}
                  labelPlacement="right"
                  />
                  <FormControlLabel
                  value={exercise3.id}
                  control={<Radio/>}
                  label={exercise3.exercise_name}
                  labelPlacement="right"
                  />
                  <FormControlLabel
                  value={exercise4.id}
                  control={<Radio/>}
                  label={exercise4.exercise_name}
                  labelPlacement="right"
                  />

                  {/* {listExercise.map( (item) =>
                    <FormControlLabel
                    value={item.id}
                    control={<Radio/>}
                    label={item.exercise_name}
                    labelPlacement="right"
                    />
                  )} */}
                    
                    {/* // <Card fullWidth='true'>
                    //   <CardContent width='25vw'>
                    //     <Typography component="body" variant="body" align='center'>
                    //       {item.exercise_name}
                    //     </Typography>
                    //     <IconButton width={5} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    //       {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    //     </IconButton>
                    //   </CardContent>
                    //   <Collapse in={open} timeout="auto" unmountOnExit>
                    //     <Grid container spacing={3} direction='row' justify="center"  alignItems="center">
                    //     </Grid>
                    //   </Collapse>
                    // </Card> */}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <ButtonGroup 
          disableElevation 
          variant="contained" 
          fullWidth
          className={classes.buttongrouping}
          >
            <Button
              className={classes.backbutton}
              startIcon={<ArrowBackIcon />}
              backgroundColor="secondary"
              onClick={() => {history.goBack();}}
            >
              Go Back
            </Button>
            <Button
              className={classes.submitbutton}
              endIcon={<CloudUploadIcon />}
              color="secondary"
              onClick={() => getExercise4Muscle(muscle)}
            >
              See my Exercise Set!
            </Button>
          </ButtonGroup>
          
        </form>
        </div>
        </Container>
        
      </div>
      
  );
}
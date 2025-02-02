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
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ExerciseContainer from './components/ExerciseContainer';

import CustomScroller from 'react-custom-scroller';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ExerciseRatingContainer from './components/ExerciseRatingContainer'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Advanced Gym Recommender (AGR) 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function getSteps() {
  return ['Choose your preffered exercise!','Exercise Set','Rate Exercise Set!'];
};

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


export default function CardioPage() {
  const classes = useStyles();
  const username = Cookies.get('username');
  Cookies.set('PageName', "Advanced Gym Recommender - Cardio Mode");
  console.log(username)
  // console.log(Cookies.get())
  const [step1,SetStep1] = useState(false);
  const [step2,SetStep2] = useState(false);
  
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  
  
  const [muscle,setMuscle] = useState('Cardio');
  const [listExercise,setListExercise] = useState([]);
  const [preference,setPreference] = useState('')
  const [exercise1,setExercise1] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [exercise2,setExercise2] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [exercise3,setExercise3] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [exercise4,setExercise4] = useState({'id':-1, "exercise_name":"waiting for muscle choice"})
  const [preferedExerciseId,setPreferedExerciseId] = useState('-1')

  const [mode, setMode] = useState('MuscleBuilding');
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState('');
  const [setid, setSetid] = useState('');
  const pre = '/AGRFrontend/static/images/'
  const post = '.jpg'
  console.log(pre.concat(setid,post))


  const history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);
  const [open, setOpen] = useState(false);
  
  const muscleHandleChange = (event) => {
    setMuscle(event.target.value);
    console.log(muscle)
  };

  const preferenceHandleChange = (event) => {
    setPreference(event.target.value);
    setPreferedExerciseId(listExercise[event.target.value].id);
  }
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Account has been updated!');
      history.push('/Home');
    }
    // temp not working
    else if(userStatus===5)
    {
      console.log("userStatus: 3")
      setUserStatus(-1);
      history.push('/ExerciseSet');
    }

  }, [userStatus]);

  useEffect(() => {
    console.log("useEffect getting 4 random exercises")
    getExercise4Muscle(muscle);
  }, []);

  const rateMyExercises = () => {
    setActiveStep(3);
  }

  function getExercise4Muscle(muscle) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
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
  };

  const getMyFirstMuscleBuildingExercise=(username,muscle,preferedExerciseId,listExercise)=> {
    if (username!=''){
      console.log(username)
      console.log("was here")
      console.log(`/AGR/FirstRecommend?username=${username}&exercise_id=${preferedExerciseId}&mode=2&muscle=${muscle}`)
      fetch(`/AGR/FirstRecommend?username=${username}&exercise_id=${preferedExerciseId}&mode=2&muscle=${muscle}`)
          .then(response => response.json())
          .then(
            (data) => {
              console.log(data)
              setUserStatus(data.status)
              setExercises(data.set_exercise_details)
              setDate(data.set_date)
              setSetid(data.set_id)
              Cookies.set('setId', data.set_id);
              Cookies.set('setExData', data.set_exercise_details);  
            },
            (error) => {alert(error)}
          )
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else{
      if(username==''){alert('Username is not detected!')}
    }
  }

  const handleNext = () => {
    // console.log(activeStep)
    // console.log(muscle)
    if(activeStep ===0){
      console.log("routing through handleNext activeStep0")
    }
    if(activeStep ===1){
      console.log("routing through handleNext activeStep1")
    }
    if(activeStep ===2){
      console.log("routing through handleNext activeStep2")

    }
    // else if(activeStep ===0){
    //   console.log("activestep ==0 branch")

    //   getExercise4Muscle(muscle);
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
  };

  const choosingPrefferedExercise = (
    <div>
      <Grid container xs={12}>
        <Typography display='block' component="h5" variant="h5" > 
          <p><i>Choose your preffered exercise</i></p>
        </Typography>
      </Grid>
      <Grid container xs={12}>
        <FormControl component="fieldset" alignContent="center" justifyContent="center">
          <FormLabel component="legend">Click on the exercises to get more details</FormLabel>
          
          <RadioGroup 
          aria-label="Prefered excercise" 
          name="Prefered excercise" 
          value={preference} 
          onChange={preferenceHandleChange}
          orientation='vertical'
          >
            <FormControlLabel
            value='0'
            control={<Radio/>}
            label={exercise1.exercise_name}
            labelPlacement="right"
            />
            {/* <IconButton width={5} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Grid container spacing={3} direction='row' justify="center"  alignItems="center">
                <Typography display='block' component="h5" variant="h5" > 
                  <p><i>2. Choose your preffered exercise</i></p>
                </Typography>
              </Grid>
            </Collapse> */}

            <FormControlLabel
            value='1'
            control={<Radio/>}
            label={exercise2.exercise_name}
            labelPlacement="right"
            />
            <FormControlLabel
            value='2'
            control={<Radio/>}
            label={exercise3.exercise_name}
            labelPlacement="right"
            />
            <FormControlLabel
            value='3'
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
          onClick={handleBack}
        >
          Select Targeted Muscle
        </Button>
        <Button
          className={classes.submitbutton}
          endIcon={<FitnessCenterIcon />}
          color="secondary"
          onClick={() => getMyFirstMuscleBuildingExercise(username,muscle,preferedExerciseId,listExercise)}
        >
          See my Exercise Set!
        </Button>
      </ButtonGroup>

    </div>
  )
  const showExercises = (
    <div>
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
          onClick={handleBack}
        >
          Go back to preffered Exercise
        </Button>
        <Button
          className={classes.submitbutton}
          endIcon={<FitnessCenterIcon />}
          color="secondary"
          onClick={() => rateMyExercises()}
        >
          Rate my exercises!
        </Button>
      </ButtonGroup>
      </CustomScroller>
    </div>
  )
  
  const rateExercise = (
    <ExerciseRatingContainer 
    exercises= {exercises} 
    set_id={setid}
    date={date}
    />
  )

  return (
  <div className={classes.paper}>
    <Card>
      <Grid item xs={12}>
        <Typography component="h4" variant="h4"> 
          <b>Muscle Building</b>
        </Typography>
      </Grid>
      <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor: '#D7E7DC'}}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
      </Stepper>
      <CardContent>

        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            {
              {
                0: <getMusclePrefference />,
                1: <choosingPrefferedExercise />,
                2: <showExercises/>
              }[activeStep]
            }
          </Grid> */}
          <Grid item xs={12}>
            {activeStep===0?choosingPrefferedExercise:
            activeStep===1?showExercises:rateExercise}
          </Grid>
          <Grid item xs={12}>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
                <div>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>                          
                  </div>
                </div>
                )
            }
          </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </div>
  );
}
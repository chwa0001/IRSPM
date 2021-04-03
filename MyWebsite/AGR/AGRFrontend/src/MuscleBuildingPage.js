import React ,{ useState , useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ExerciseContainer from './components/ExerciseContainer';
import CustomScroller from 'react-custom-scroller';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ExerciseRatingContainer from './components/ExerciseRatingContainer'
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';

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

function getSteps() {
  return ['Choose targeted muscle', 'Choose your preffered exercise!','Exercise Set','Rate Exercise Set!'];
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
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


export default function MuscleBuildingPage() {
  const classes = useStyles();
  const username = Cookies.get('username')
  console.log(username)  
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  
  
  const [muscle,setMuscle] = useState(' ');
  const [listExercise,setListExercise] = useState([]);
  const musclechoices = ['Forearm','Shoulders','Triceps','Upper Legs','Lower Legs','Chest','Back','Biceps','Abs', 'Glutes']
  const [preference,setPreference] = useState('')
  const [preferedExerciseId,setPreferedExerciseId] = useState('-1')

  const [mode, setMode] = useState('MuscleBuilding');
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState('');
  const [setid, setSetid] = useState('');
  const [rateit,triggerToRate] = useState(0);
  const pre = '/AGRFrontend/static/images/'
  const post = '.jpg'
  console.log(pre.concat(setid,post));

  const history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);
  
  const muscleHandleChange = (event) => {
    setMuscle(event.target.value);
    console.log(muscle)
  };

  const preferenceHandleChange = (event) => {
    console.log(event.target.value)
    setPreference(event.target.value);
    setPreferedExerciseId(listExercise[event.target.value].id);
  }
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackToHome = () => {
    history.push('/Home');
  };


  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Account has been updated!');
      history.push('/Home');
    }
    else if(userStatus===5)
    {
      console.log("userStatus: 3")
      setUserStatus(-1);
      history.push('/ExerciseSet');
    }

  }, [userStatus]);


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
            console.log(data.exercises);
            console.log(listExercise);
          },
          (error) => {alert(error)}
        )
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    if(activeStep ===0){
      console.log("routing through handleNext activeStep0");
      getExercise4Muscle(muscle);
    }
    if(activeStep ===1){
      console.log("routing through handleNext activeStep1");
      getMyFirstMuscleBuildingExercise(username,muscle,preferedExerciseId,listExercise);
    }
    if(activeStep ===2){
      console.log("routing through handleNext activeStep2");
      setActiveStep(3);
    }
    if(activeStep ===3){
      console.log("routing through handleNext activeStep3");
      triggerToRate(1);
    }
  };

  const getMusclePrefference = (
    <div>
      <Grid item xs={12}>
        <Typography component="h5" variant="h5"> 
          <i>To get started, choose a targeted muscle group</i>
        </Typography>
      </Grid>
      <Grid item xs={12}>
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
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {musclechoices.map( (item) =>
              <MenuItem value={item}>{item}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
    </div>
  )

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
            <Grid className={classes.formControl} spacing={2}>
            {listExercise.map((item) =>
              <Grid>
              <FormControlLabel
              value={listExercise.indexOf(item).toString()}
              control={<Radio/>}
              label={item.exercise_name}
              labelPlacement="right"
              />
              <Collapse in={listExercise.indexOf(item).toString()===preference}>
                <Grid container spacing={3} direction='row' justify="center"  alignItems="center">
                  {item.pic_no.map(
                    (pic)=>
                    <Grid item xs={12} sm={6}>
                    <CardMedia
                      style = {{ height: 100, paddingTop: '90%'}}
                      image={pre.concat(pic,post)}
                      />
                    </Grid>
                  )}
                </Grid>
              </Collapse>
              </Grid>
            )}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
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
      {exercises.map((tile) => (
        <ExerciseContainer 
        imgs= {tile.pic_no}
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
    </div>
  )
  
  const rateExercise = (
    <ExerciseRatingContainer 
    exercises= {exercises} 
    set_id={setid}
    date={date}
    rateit={rateit}
    />
  )

  return (
    <div className={classes.paper}>
      <Card>
        <CardHeader avatar={<FitnessCenterIcon/>} 
          action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
          title={<Typography variant="h5" component="h2">Muscle Building</Typography>}
        />
        <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor: '#34ebe8'}}>
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
              {activeStep===0?getMusclePrefference:
              activeStep===1?choosingPrefferedExercise:
              activeStep===2?showExercises:rateExercise}
            </Grid>
            <Grid item xs={12}>
              {/* back button for all pages*/}
              <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
              >
              {(()=>{
                  switch(activeStep){
                    case 0:
                      return 'Back';
                    case 1:
                      return 'Select Targeted Muscle';
                    case 2:
                      return 'Go back to preffered Exercise';
                    case 3:
                      return 'Check my exercise set';  
                    default:
                      return 'Back';
                  }
              })()}
              {/* only for the last page */}
              </Button>
              <Button
                style={activeStep !== 3?{display: 'none'}:{display: null}}
                onClick={handleBackToHome}
                className={classes.backButton}
                color="secondary"
                variant="contained"
                >
                Rate My Exercise Later
              </Button>
              {/* Next pages for all pages */}
              <Button variant="contained" color="primary" onClick={handleNext}>
                {(()=>{
                  switch(activeStep){
                    case 0:
                      return 'Generate exercises';
                    case 1:
                      return 'See my Exercise Set';
                    case 2:
                      return 'Rate my exercises';
                    case 3:
                      return 'Save my rating';  
                    default:
                      return 'Next';
                  }
                })()}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
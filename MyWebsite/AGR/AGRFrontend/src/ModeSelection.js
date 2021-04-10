import React ,{ useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  Images:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return ['Start Your Recommender Mode', 'Update Your Personal Data', 'Start Your Fitness'];
}

export default function ModeSelection() {
  const classes = useStyles();
  let history = useHistory()
  const username = Cookies.get('username');
  Cookies.set('PageName', "Advance Gym Recommender - Choose your mode");
  const [RecommendMode,SetRecommendMode] = useState(true);
  const [GlossaryMode,SetGlossaryMode] = useState(false);
  const [mode,SetMode] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();


  const [fitnesslevel,setFitnesslevel] = useState('');
  const [gender,setGender] = useState('');
  const [goal,setGoal] = useState('');
  const [bmi,setBmi] = useState('');
  const [intensity,setIntensity] = useState('');
  const [location,setLocation] = useState('');

  const [FitnessMode, setFitnessMode] = useState(0);
  const [checkifFirst, setCheckifFirst] = useState("NA");

  const handleChangeFitnessMode = (event, newValue) => {
    setFitnessMode(newValue);
    CheckModeFirst(username,newValue)
  };

  // const handleChangeMode1 = (event) => {
  //   SetRecommendMode(event.target.checked);
  // };

  // const handleChangeMode2 = (event) => {
  //   SetGlossaryMode(event.target.checked);
  //   SetPastMode(!event.target.checked);
  // };
  const handleChangeMode = (event) => {
    if(event.target.value==="RM"){
      SetRecommendMode(true);
      SetGlossaryMode(false);
    }
    else if(event.target.value==="GM"){
      SetRecommendMode(false);
      SetGlossaryMode(true);
    }
    SetMode(event.target.value);
  };

  function SetUserData(username,fitnesslevel,goal,intensity,gender,bmi,location) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
          gender:gender,
          fitness_level:fitnesslevel,
          goal:goal,
          bmi:bmi,
          intensity:intensity,
          location:location,
        }),
    };
    if (username!='' && fitnesslevel!='' && gender!='' && goal!='' && intensity!='' && bmi!=''){
    fetch('/AGR/SetUserData', requestOptions)
        .then(function(response){
          if (!response.ok){
            throw new Error('Response not OK');
          }
          else{
            return response.json();
          }
        }).then(
          (data) => {
            console.log(data)

          },
          (error) => {alert(error)}
        )
      }
    else{
      if(bmi=='') {alert('All field must be field!')}
      else if (fitnesslevel==''){alert('All field must be field!')}
      else if (goal==''){alert('All field must be field!')}
      else if (gender==''){alert('All field must be field!')}
      else if (intensity==''){alert('All field must be field!')}
    }
  }

  const handleNext = () => {
    if(activeStep ===2){
      SetUserData(username,fitnesslevel,goal,intensity,gender,bmi,location);
      if(RecommendMode){
        switch(FitnessMode){
          case 1:
            if(checkifFirst==='YES')
            {
              history.push('/GeneralFitness')
            }
            else if(checkifFirst==='NO'){
              history.push('/RGeneralFitness')
            }
            else{
              alert("unable to check backend on history")
            }          
            break;
          case 2:
            if(checkifFirst==='YES')
            {
              history.push('/MuscleBuilding')
            }
            else if(checkifFirst==='NO'){
              history.push('/RMuscleBuilding')
            }
            else{
              alert("unable to check backend on history")
            }          
            break;
          case 3:
            if(checkifFirst==='YES')
            {
              history.push('/EndurenceTraining')
            }
            else if(checkifFirst==='NO'){
              history.push('/REndurenceTraining')
            }
            else{
              alert("unable to check backend on history")
            }          
            break;
          default:
            alert("Please select a fitness mode!")
        }
      }
    }
    else if(activeStep ===1){
      if(fitnesslevel===""||gender===""||goal===""||bmi===""||intensity===""||location===""){
        alert("Any of the personal data cannot be empty!")
      }      
      else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const genderHandleChange = (event) => {
    setGender(event.target.value);
  };

  const fitnessHandleChange = (event) => {
    setFitnesslevel(event.target.value);
  };

  const goalHandleChange = (event) => {
    setGoal(event.target.value);
  };

  const intensityHandleChange = (event) => {
    setIntensity(event.target.value);
  };

  const locationHandleChange = (event) => {
    setLocation(event.target.value);
  };
  
  const CheckModeFirst=(username,mode)=> {
    if (username!=''){
      console.log(`/AGR/CheckModeFirst?username=${username}&mode=${mode}`)
      fetch(`/AGR/CheckModeFirst?username=${username}&mode=${mode}`)
          .then(response => response.json())
          .then(
            (data) => {
              console.log(data.firsttime)
              setCheckifFirst(data.firsttime)
            },
            (error) => {alert("this is in check mode first alert")}
          )
      ;
    }
    else{
      if(username==''){alert('Username is not detected!')}
      if(mode==''){alert('There is no mode detected!')}
    }
  };

  // const renderModeSelection = (
  // <Grid container spacing={2}>
  // <Grid item xs={12}>
  //   <FormControlLabel
  //     control={
  //       <Switch
  //         checked={RecommendMode}
  //         onChange={handleChangeMode1}
  //         name="RecommendMode"
  //         color="primary"
  //       />
  //     }
  //     style={(RecommendMode)?{color:'#ca2c92'}:{color:'#567ace'}}
  //     label={(RecommendMode)?"Recommender Mode":"Normal Mode"}
      
  //   />
  //   </Grid>
  //   <Grid item xs={12}>
  //   <Collapse in={!RecommendMode} timeout="auto" unmountOnExit>
  //   <FormControlLabel
  //     control={
  //       <Switch
  //         checked={GlossaryMode}
  //         onChange={handleChangeMode2}
  //         name="NormalMode"
  //         color="secondary"
  //       />
  //     }
  //     style={(GlossaryMode)?{color:'#ff3000'}:((PastMode)?{color:'#44975c'}:{color:'#465b73'})}
  //     label={(GlossaryMode)?"Glossary Mode":((PastMode)?"Past Routine Mode":"Toggle to choose your mode!")}
      
  //   />
  //   </Collapse>

  //   </Grid>
  //   </Grid>
  //   );

  const renderModeSelection = (
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <Typography >Please be patient to go through all the required steps for our Recommender.</Typography>
    {/* <RadioGroup aria-label="mode" name="mode" value={mode} onChange={handleChangeMode}>
        <FormControlLabel value="RM" control={<Radio />} label="Recommender Mode" style={(mode==="RM")?{color:'#ff3000'}:{color:'#567ace'}}/>
        <FormControlLabel value="GM" control={<Radio />} label="Glossary Mode" style={(mode==="GM")?{color:'#ff3000'}:{color:'#567ace'}}/>
    </RadioGroup> */}
    </Grid>
    </Grid>
      );

  const renderUserData = (
    <Grid container 
          spacing={2}
    >
      <Grid item xs={12}>
        <Typography component="h5">
          <i>Getting to know more about you </i>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl 
              fullWidth='true'
              className={classes.formControl}
        >
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            value={gender}
            onChange={genderHandleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'M'}>Male</MenuItem>
            <MenuItem value={'F'}>Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl 
        fullWidth='true'
        className={classes.formControl}
        >
          <InputLabel id="fitnesslevel">Fitness Level</InputLabel>
          <Select
            labelId="fitnesslevel"
            id="fitnesslevel"
            value={fitnesslevel}
            onChange={fitnessHandleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Beginer</MenuItem>
            <MenuItem value={2}>Intermediate</MenuItem>
            <MenuItem value={3}>Advance</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl 
        fullWidth='true'
        className={classes.formControl}
        >
          <InputLabel id="goal">Goal</InputLabel>
          <Select
            labelId="goal"
            id="goal"
            value={goal}
            onChange={goalHandleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>General Training</MenuItem>
            <MenuItem value={2}>Muscle Building</MenuItem>
            <MenuItem value={3}>Endurance Training</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl 
        fullWidth='true'
        className={classes.formControl}
        >
          <InputLabel id="intensity">Exercise Intensity</InputLabel>
          <Select
            labelId="intensity"
            id="intensity"
            value={intensity}
            onChange={intensityHandleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={1}>Low-Medium</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Medium-High</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl 
        fullWidth='true'
        className={classes.formControl}
        >
          <InputLabel id="location">Exercise Location</InputLabel>
          <Select
            labelId="location"
            id="location"
            value={location}
            onChange={locationHandleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Home</MenuItem>
            <MenuItem value={2}>Gym</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl 
        fullWidth='true'
        className={classes.formControl}
        >
          <TextField
            id="bmi"
            label="BMI"
            type="number"            
            inputProps={{
              step: 0.01,
              min:15,
              max:30,
            }}
            defaultValue={bmi}
            value={bmi}
            fullWidth
            onChange={e => setBmi(e.target.value)}
          />
        </FormControl>
    </Grid>
    </Grid>
  )

  const renderFitnessMode = (
    <div className={classes.grow}>
      {RecommendMode===true?(
      <Grid container 
      spacing={2}
      >
        <Grid item xs={12}>
          <Tabs value={FitnessMode} onChange={handleChangeFitnessMode} aria-label="simple tabs example" centered variant='fullWidth'>
              <Tab label="General Fitness" icon={<DirectionsRunIcon />} value={1} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
              <Tab label="Focused Muscle Building" icon={<FitnessCenterIcon />} value={2} id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
              <Tab label="Endurance Training" icon={<AccessibilityIcon />} value={3} id="simple-tab-3" aria-controls="simple-tabpanel-3" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <div role="tabpanel" hidden={FitnessMode!==1} id="wrapped-tabpanel-1" aria-labelledby="wrapped-tab-1">
            <Card direction='row'>
              <CardMedia 
              component="img"
              alt="General Fitness"
              image="/AGRFrontend/static/images/GF.png"
              title="General Fitness"
              className={classes.Images}
              style = {{ height: 250, width:250}}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                General Fitness Description
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12}>
        <div role="tabpanel" hidden={FitnessMode!==2} id="wrapped-tabpanel-1" aria-labelledby="wrapped-tab-1">
          <Card>
              <CardMedia 
              component="img"
              alt="Focused Muscle Building"
              image="/AGRFrontend/static/images/MB.png"
              title="Focused Muscle Building"
              className={classes.Images}
              style = {{ height: 250, width:250}}
              /> 
            <CardContent>
              <Typography variant="h5" component="h2">
              General Fitness Description
              </Typography>
            </CardContent>
          </Card>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div role="tabpanel" hidden={FitnessMode!==3} id="wrapped-tabpanel-1" aria-labelledby="wrapped-tab-1">
            <Card>
              <CardMedia 
              component="img"
              alt="Endurance Training"
              image="/AGRFrontend/static/images/ET.png"
              title="Endurance Training"
              className={classes.Images}
              style = {{ height: 250, width:250}}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                General Fitness Description
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
          ):(
          <div>Glossary mode</div>
      )
      }
      
    </div>
  )
  
  useEffect(()=> {

    console.log("react response - UseEffect")

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
          }),
        };
        if (username!=''){
        fetch('/AGR/GetUserData', requestOptions)
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
              console.log(data.gender)
              console.log(data.fitness_level)
              console.log(data.goal)
              console.log(data.intensity)
              console.log(data.bmi)
              console.log(data.location)

              setGender(data.gender);
              setFitnesslevel(data.fitness_level);
              setGoal(data.goal);
              setIntensity(data.intensity);
              setBmi(data.bmi);
              setLocation(data.location);
            },
            // (error) => {alert(error)}
          )
        }

  }, []);  
 
  return (
        <div className={classes.paper}>
          <Card>
          <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor: '#34ebe8'}}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
          </Stepper>
          <CardContent>

          <Grid container spacing={2}>
            {activeStep === 0 ? (
              <Grid item xs={12}>
              {renderModeSelection}
              </Grid>
            ):(
              <Grid item xs={12}>
              {activeStep===1?renderUserData:renderFitnessMode}
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Grid>
          </Grid>
          </CardContent>
          </Card>
        </div>
  );
}
import React ,{ useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuBar from './components/MenuBar';

import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Green2Radio = withStyles({
    root: {
      color: green[200],
      '&$checked': {
        color: green[400],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Red2Radio = withStyles({
    root: {
      color: red[200],
      '&$checked': {
        color: red[400],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(4),
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
    height: 42,
  },
  text: {
    // outlineColor: '#8eb8ad',
  },
  submitbutton:{
    backgroundColor:"#0a57f2",
    color: 'white',
    height: 42,
  },
  buttongrouping:{
    padding: '60px 3px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));



export default function ExerciseRatingPage() {
  const classes = useStyles();
  const username = Cookies.get('username') // cookies not working
  const [score, setScore] = useState('')
  const [userId, setUserId] = useState('')
  const [setId, setSetId] = useState('')
  const [date, setDate] = useState('')
  const [exercises, setExercises] = useState([{'id':1,'name':''}])

  const [userStatus, setUserStatus] = useState(-1)
  const history = useHistory();
  const [refresh, setRefresh] = useState(0)


  React.useEffect(()=> {

    console.log("react response - UseEffect")

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
          }),
        };
        console.log(username)
        console.log(requestOptions)
        if (username!=''){
          fetch('/AGR/GetSetToRate', requestOptions)
          .then(function(response){
            console.log(response)
            if (response.status === 418){
              setUserStatus(3)
            }
            else if (!response.ok){
              throw new Error('Response not OK');
            }
            else{
              return response.json();
            }
          }).then(
            (data) => {
              console.log(data.user_id)
              console.log(data.set_id)
              console.log(data.date)
              console.log(data.exercises)
              console.log(data.exercise1)
              console.log(data.exercise6)
              setUserId(data.user_id);
              setSetId(data.set_id);
              setDate(data.date);
              if (data.exercises){
                setExercises(data.exercises);
              }
              else{
                setExercises([{'id':1,'name':''}]);
              }
              setUserStatus(data.status);
            },
            (error) => {
              userStatus(-5)
              alert(error)
            }
          )
        }

  }, [refresh]);  
   

  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      setRefresh(refresh + 1);
      history.push('/ExerciseRating');
    }
    else if (userStatus===1)
    {
      setUserStatus(-1);
      alert('Rating was not save, try refreshing!')
    }
    else if (userStatus===2){
      setUserStatus(-1);
      alert('Not sure but cannot signup!')
    }
    else if (userStatus===3){
      setUserStatus(-1);
      alert('No exercise to rate! Come back later')
      history.push('/Home');
    }
    else if (userStatus===-5){
      setUserStatus(-1);
      alert('You have not sign in, please sign in!')
      history.push('/');
    }

  }, [userStatus])

  useEffect(() => {
    if(username==='undefined')
    {
      alert('U have not sign in, please sign in!')
      history.push('/');
    }
    else if(username==='')
    {
      alert('U have not sign in, please sign in!')
      history.push('/');
    }
  }, [username])

  function SaveUserRating(username,setId,score) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
          set_id:setId,
          score:score,
        }),
    };
    console.log(requestOptions);
    if (username!='' && score!='' && setId!=''){
    fetch('/AGR/ExerciseRating', requestOptions)
        .then(function(response){
          if (!response.ok){
            throw new Error('Response not OK');
          }
          else{
            return response.json();
          }
        }).then(
          (data) => {
            setUserStatus(data.status);
          },
          (error) => {alert(error)}
        )
      }
    else{
    }
  }
  
  const scoreHandleChange = (event) => {
    setScore(event.target.value);
  };
  
  return (
      <div className={classes.paper}>
      
        <Grid container direction="column" justify="space-between" alignItems="flex-start" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h4">
                <b>Exercise Set Rating</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                <i>Get better recommendation by rating your previous exercises!</i>
              </Typography>
            </Grid>
        </Grid>

        <Grid container direction="column" justify="space-between" alignItems="flex-start" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h6">
                <p><b>Exercise Date:</b></p> 
              </Typography>
              <Typography variant="body1" component="body1">
                <p>{date}</p>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h6"> 
                <b>Exercise List</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" component="body1">
                {exercises.map((exercise) => (
                <li key={exercise.id}>{exercise.name}</li>
              ))}
              </Typography>
            </Grid>
        </Grid>
      <Grid xs={12}>
        <FormControl component="fieldset" alignContent="center" justifyContent="center">
              <FormLabel component="legend">Set Rating</FormLabel>

              <RadioGroup 
              row
              aria-label="ExerciseRating" 
              name="ExerciseRating" 
              value={score} 
              onChange={scoreHandleChange}
              labelPlacement="bottom"
              alignItems='center'
              >
                <FormControlLabel
                value="1"
                control={<RedRadio/>}
                label="1"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="2"
                control={<Red2Radio/>}
                label="2"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="3"
                control={<Radio/>}
                label="3"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="4"
                control={<Green2Radio/>}
                label="4"
                labelPlacement="bottom"
                />
                <FormControlLabel
                value="5"
                control={<GreenRadio/>}
                label="5"
                labelPlacement="bottom"
                />
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
            onClick={() => {history.goBack();}}
          >
            Go Back
          </Button>
          <Button
            className={classes.submitbutton}
            endIcon={<CloudUploadIcon />}
            color="secondary"
            onClick={() => SaveUserRating(username,setId,score)}
          >
            Save Rating
          </Button>
        </ButtonGroup>
      </div>
      
  );
  
}
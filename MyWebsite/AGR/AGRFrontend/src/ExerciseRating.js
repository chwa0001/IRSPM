import React ,{ useState , useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
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
  const [exercises, setExercises] = useState('')

  const history = useHistory();
  

  React.useEffect(()=> {

    console.log("response")

      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username:username,
        }),
      };
      if (username!=''){
      fetch('/AGR/GetSetToRate', requestOptions)
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
              console.log(data.user_id)
              console.log(data.set_id)
              console.log(data.date)
              console.log(data.rate)
              setUserId(data.user_id);
              setSetId(data.set_id);
              setDate(data.date);
            },
            // (error) => {alert(error)}
          )
        }

  }, []);  
   

  // useEffect(() => {
  //   if(userStatus===0)
  //   {
  //     setUserStatus(-1);
  //     alert('Account has been updated!');
  //     history.push('/Home');
  //   }
  //   else if (userStatus===1)
  //   {
  //     setUserStatus(-1);
  //     // setAlertShow('visible');
  //     // setAlertText('Username has been used!');
  //     alert('Username has been used!')
  //   }
  //   else if (userStatus===2){
  //     setUserStatus(-1);
  //     // setAlertShow('visible');
  //     // setAlertText('Not sure but cannot signup!');
  //     alert('Not sure but cannot signup!')
  //   }
  // }, [userStatus])

  // function SaveUserRating(username,setId,score) {
  //   const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         username:username,
  //         set_id:set_id,
  //         score:score,
  //       }),
  //   };
  //   if (username!='' && score!='' && set_id!=''){
  //   fetch('/AGR/ExerciseRating', requestOptions)
  //       .then(function(response){
  //         if (!response.ok){
  //           throw new Error('Response not OK');
  //         }
  //         else{
  //           return response.json();
  //         }
  //       }).then(
  //         (data) => {
  //           setUserStatus(data.status);
  //         },
  //         (error) => {alert(error)}
  //       )
  //     }
  //   else{
  //   }
  // }
  
  const scoreHandleChange = (event) => {
    setScore(event.target.value);
  };

  return (
      <div className={classes.grow}>
        <MenuBar/>
        <CssBaseline />
        <div className={classes.paper}>
        <Container component="main" maxWidth="xs">
        <form className={classes.form} noValidate>
          <Grid container 
          spacing={2}
          className={classes.text}
          >
            <Grid item xs={12}>
              <Typography component="h4">
                Exercise Set Raiting
              </Typography>
              <Typography component="subtitle">
                <i>Get better recommendation by rating your previous exercises!!!!!</i>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
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
        </form>
        </Container>
        </div>
      </div>
      
  );
}
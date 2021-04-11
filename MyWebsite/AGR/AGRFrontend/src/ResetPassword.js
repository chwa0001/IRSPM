
import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import moment from 'moment';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [dob,setDOB] = useState('');
  const [alertText,setAlertText] = useState('');
  const [alertShow,setAlertShow] = useState('hidden');

  let history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);
  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Password is changed successfully!')
      history.push('/');
    }
    else if (userStatus===1)
    {
      setUserStatus(-1);
      setAlertShow('visible');
      setAlertText('Invalid date of birth is provided!');
    }
    else if (userStatus===2){
      setUserStatus(-1);
      setAlertShow('visible');
      setAlertText('Invalid username!');
    }
  }, [userStatus])
  function Reset(username,password,dob) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        DOB:dob,
        CreateUser:0,
      }),
  };
  const boolDateValue = moment(dob,'DDMMYYYY',true).isValid();
  if (username!='' && password!=''&& boolDateValue==true){
  fetch('/AGR/CreateUser', requestOptions)
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
    if(username==''){alert('Username cannot be blank!')}
    else if(password==''){alert('Password cannot be blank!')}
    else if(boolDateValue==false){alert('Date of Birth cannot be blank or incorrect format!')}
  }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username1"
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="DOB"
            label="Date Of Birth(DDMMYYYY)"
            name="DOB"
            autoComplete="off"
            autoFocus
            onChange={e => setDOB(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => Reset(username,password,dob)}
          >
            Reset Password
          </Button>
          <Grid container alignItems="flex-end">
            <Grid item >
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={1} visibility={alertShow}>
      <Alert severity="error">{alertText}</Alert>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
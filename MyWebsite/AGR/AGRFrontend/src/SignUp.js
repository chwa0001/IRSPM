import React ,{useState,useEffect} from 'react';
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
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [fullname,setFullname] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [dob,setDOB] = useState('');
  let history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);
  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Account is signup successfully!');
      Cookies.set('username', username);
      history.push('/ModeSelection');
    }
    else if (userStatus===1)
    {
      setUserStatus(-1);
      // setAlertShow('visible');
      // setAlertText('Username has been used!');
      alert('Username has been used!')
    }
    else if (userStatus===2){
      setUserStatus(-1);
      // setAlertShow('visible');
      // setAlertText('Not sure but cannot signup!');
      alert('Not sure but cannot signup!')
    }
  }, [userStatus])
  function SignupNow(fullname,username,password,dob) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
          password: password,
          fullname:fullname,
          DOB:dob,
          CreateUser:1,
        }),
    };
    const boolDateValue = moment(dob,'DDMMYYYY',true).isValid();
    if (fullname!='' && username!='' && password!=''&& boolDateValue==true){
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
      if(fullname=='') {alert('Username cannot be blank!')}
      else if (username==''){alert('Full name cannot be blank!')}
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
          Sign Up Now!
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                autoFocus
                onChange={e => setFullname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="DOB"
                label="Date of Birth(DDMMYYYY)"
                name="DOB"
                autoComplete="off"
                onChange={e => setDOB(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => SignupNow(fullname,username,password,dob)}
          >
            Sign Up Now!
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
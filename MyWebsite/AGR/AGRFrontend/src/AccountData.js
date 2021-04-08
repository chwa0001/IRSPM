import React ,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import EditIcon from '@material-ui/icons/Edit';
import MenuBar from './components/MenuBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  submitbutton:{
    // backgroundColor:"#0a57f2",
    color: 'white',
    height: 36,
  },
  buttongrouping:{
    padding: '90px 15px',
  },
  save: {
    margin: theme.spacing(2, 0, 1),
    // backgroundColor: '#34ebe8',
  },
  edit: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: '#3462eb',
  },
}));

export default function AccountData() {
  const classes = useStyles();
  const originalUsername = Cookies.get('username');
  Cookies.set('PageName', "Advance Gym Recommender - My Profile");
  const [fullname,setFullname] = useState('');
  const [username,setUsername] = useState(originalUsername);
  const [password,setPassword] = useState('');
  const [dob,setDOB] = useState('');
  const [required, setRequired] = useState(false);
  const [variant,setVariant] = useState('filled');
  let history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);

  React.useEffect(()=> {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        };
        if (username!=''){
        fetch(`/AGR/AccountData?username=${username}`, requestOptions)
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
              console.log(data.DOB);
              console.log(data.fullname);
              setFullname(data.fullname);
              setUsername(data.username);
              setDOB(data.DOB);
              setPassword(data.password);
            },
            (error) => {console.log(error)}
          )
        }

  }, []);


  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Account is updated successfully!');
      Cookies.set('username', username);
      history.goBack();
    }
    else if (userStatus===2){
      setUserStatus(-1);
      alert('Username is not found!')
    }
  }, [userStatus])

  useEffect(() => {
    if(required){
      setVariant('outlined');
    }
    else{
      setVariant('filled');
    }
  }, [required])

  function SetAccountData(fullname,username,dob,password,originalUsername) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: originalUsername,
        newUsername: username,
        password: password,
        fullname:fullname,
        DOB:dob,
        CreateUser:2,
      }),
  };
    const boolDateValue = moment(dob,'DDMMYYYY',true).isValid();
    if (fullname!='' && username!='' && boolDateValue==true && password!=''){
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
      else if(boolDateValue==false){alert('Date of Birth cannot be blank or incorrect format!')}
      else if(password==''){alert('Password cannot be blank!')}
    }
    }
  return (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            My Account
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="fullName"
                  variant={variant}
                  required={required}
                  disabled={!required}
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  value={fullname}
                  autoFocus
                  onChange={e => setFullname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  required={required}
                  disabled={!required}
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  autoComplete="off"
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  required={required}
                  disabled={!required}
                  fullWidth
                  id="DOB"
                  label="Date of Birth(DDMMYYYY)"
                  name="DOB"
                  value={dob}
                  autoComplete="off"
                  onChange={e => setDOB(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={variant}
                  required={required}
                  disabled={!required}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="off"
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                className={required?classes.save:classes.edit}
                startIcon={<EditIcon/>}
                onClick={() => setRequired(!required)}
                >
                  {required?'Save your changes':'Edit your account'}
            </Button>
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
                onClick={() => SetAccountData(fullname,username,dob,password,originalUsername)}
              >
                Update My Data
              </Button>
          </ButtonGroup>
          </form>
        </div>
  );
}
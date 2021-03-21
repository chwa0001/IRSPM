import React ,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import MenuBar from './components/MenuBar'

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
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#8eb8ad',
  },
  save: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: '#34ebe8',
  },
  edit: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: '#3462eb',
  },
}));

export default function AccountData() {
  const classes = useStyles();
  const [fullname,setFullname] = useState('');
  const [username,setUsername] = useState('');
  const [dob,setDOB] = useState('');
  const [required, setRequired] = useState(false);
  const [variant,setVariant] = useState('filled');
  let history = useHistory();
  const [userStatus, setUserStatus] = useState(-1);
  useEffect(() => {
    if(userStatus===0)
    {
      setUserStatus(-1);
      alert('Account is signup successfully!');
      Cookies.set('username', username);
      history.push('/');
    }
    else if (userStatus===1)
    {
      setUserStatus(-1);
      alert('Username has been used!')
    }
    else if (userStatus===2){
      setUserStatus(-1);
      alert('Not sure but cannot signup!')
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

  function SetAccountData(fullname,username,dob) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
          fullname:fullname,
          DOB:dob,
        }),
    };
    const boolDateValue = moment(dob,'DDMMYYYY',true).isValid();
    if (fullname!='' && username!='' && boolDateValue==true){
    fetch('/AGR/SetAccountData', requestOptions)
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
    }
    }
  return (
    <div className={classes.grow}>
      <MenuBar/>
      <CssBaseline />
      <div className={classes.paper}>
      <Container component="main" maxWidth="xs">
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
                autoComplete="off"
                onChange={e => setDOB(e.target.value)}
              />
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
          </Grid>
          
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            startIcon={<CloudUploadIcon />}
            onClick={() => setRequiredFromDisabled(true)}
          >
            Update My Account
          </Button>
        </form>
        </Container>
      </div>
      </div>
  );
}
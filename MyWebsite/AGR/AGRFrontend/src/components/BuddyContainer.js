import React ,{ useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ExBuddyGrid(props) {
  const classes = useStyles();
  const pre = '/AGRFrontend/static/images/'
  const post = '.jpg'
  const images = props.expics
  const count = props.count
  const slicedimages = images.slice((count-1)*6,((count*6)))

  const [goalStatus, setGoalStatus] = useState([props.goal]);
  const [locationStatus, setLocationStatus] = useState([props.location]);
  const [fitnessStatus, setFitnessStatus] = useState([props.fitness]);

  useEffect(() => {
    if(props.goal===1)
    {
      setGoalStatus('General Fitness')
    }
    else if (props.goal===2)
    {
      setGoalStatus('Muscle Building')
    }
    else if (props.goal===3){
      setGoalStatus('Endurance Training')
    }
  }, [])

  useEffect(() => {
    if(props.location===1)
    {
      setLocationStatus('Gym')
    }
    else if (props.location===2)
    {
      setLocationStatus('Home')
    }
  }, [])


  useEffect(() => {
    if(props.fitness===1)
    {
      setFitnessStatus('Beginner')
    }
    else if (props.fitness===2)
    {
      setFitnessStatus('Intermediate')
    }
    else if (props.fitness===3){
      setFitnessStatus('Advanced')
    }
  }, [])




  
  function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


  function FormRow(rowdata) {
    return (
      <React.Fragment>
      <Grid item xs={3}>
        <Typography gutterBottom variant={rowdata.type}>
          {rowdata.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" gutterBottom>
          {rowdata.value}
        </Typography>
      </Grid>
      </React.Fragment>
    );
  }

    // const [ex_pics,setExpicsdata] = useState([]);

    // const [data,setData]=useState([]);
    // const getData=(i)=>{
    //   fetch('/AGR/GetExerciseDetails?id='.concat(i)
    //   ,{
    //     headers : { 
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //      }
    //   }
    //   )
    //     .then(function(response){
    //       console.log(response)
    //       return response.json();
    //     })
    //     .then(function(myJson) {
    //       console.log(myJson);
    //       setData(myJson)
    //       setExpicsdata(myJson.pic_no)
    //     });
    // }

    // useEffect(()=>{
    //   getData()
    // },[])

    // function Getpics(props) {
    //   fetch('/AGR/GetExerciseDetails?id='
    //   ,{
    //     headers : { 
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //      }
    //   }
    //   )
    //     .then(function(response){
    //       console.log(response)
    //       return response.json();
    //     })
    //     .then(function(myJson) {
    //       console.log(myJson);
    //       setData(myJson)
    //       setExpicsdata(myJson.pic_no)
    //     }); 
    // }
    
    // {images.map((exercise) => ( 
    //   getData(exercise)
    //   ))} 


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      {/* <ButtonBase>
              <Typography variant="subtitle1"> {props.count}</Typography>
      </ButtonBase> */}
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/DefaultProfilePic.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs> 
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"subtitle1"} name={'User ID'} value={props.userid}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Age:'} value={props.age}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Gender:'} value={props.gender}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Goal:'} value={goalStatus}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Preferred Location:'} value={locationStatus}/>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <FormRow type={"body2"} name={'Fitness:'} value={fitnessStatus}/>
              </Grid>
                <Grid item xs={12} container spacing={3}> 
                <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Recommended Exercises:
                </Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3}>

                {slicedimages.map((exercise) => ( 

                <Grid item xs={3} >
                {/* <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/56.jpg" /> */}
                <img className={classes.img} alt="complex" src={pre.concat(exercise,post)} />
                </Grid>
                ))} 
                

                {/* <Grid item xs={3}>
                <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/56.jpg" />
                </Grid>
                <Grid item xs={3}>
                <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/56.jpg" />
                </Grid>
                <Grid item xs={3}>
                <img className={classes.img} alt="complex" src="/AGRFrontend/static/images/28.jpg" />
                </Grid> */}
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
            <ButtonBase>
              <Typography variant="subtitle1"> + Add User</Typography>
            </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

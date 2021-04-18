import React ,{ useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './_ExData';
import ExerciseContainer from './components/ExerciseContainer';
import ExBuddyGrid from './components/BuddyContainer';
import ExGroupGrid from './components/GroupContainer';
import MenuBar from './components/MenuBar';
import CustomScroller from 'react-custom-scroller';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,

  },
  root: {
    flexGrow: 1,
    maxWidth: 500,

  },
  card: {
    flexGrow: 1,
    maxWidth: 1000,

  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function ExerciseBuddytest() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    Cookies.set('PageName', "Advance Gym Recommender - Your Buddy");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [exercises,setExercises] = useState([]);
    const [nearest_users,setNearestusers] = useState([]);
    const [group_exercises,setGroupexercises] = useState([]);
    const [nu_data,setNUdata] = useState([]);
    const [ex_pics,setExpicsdata] = useState([]);

    const [data,setData]=useState([]);
    const getData=()=>{
      fetch('/AGR/Algo?user_id=61'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          setData(myJson)
          setExercises(myJson.ex)
          setNearestusers(myJson.nu)
          setGroupexercises(myJson.ge)
          setNUdata(myJson.nudata)
          setExpicsdata(myJson.expics)
        });
    }
    useEffect(()=>{
      getData()
    },[])

    // const [ex_pics2,setExpicsdata2] = useState([]);
    // const pre = '/AGR/GetExerciseDetails?'
    // const filler = '&id='
    // const grpex = group_exercises
    // const url = pre.concat(filler,1)
    // const url2 = url.concat(filler,2)
    // const url3 = url2.concat(filler,3)
    // const url4 = url3.concat(filler,4)
    // const urlist = []

    // // {group_exercises.map((exercise) => ( 
    // //   urlist.push(url2)  ) 
    // // )}  

    // const getData2=(i)=>{
    //   // fetch('/AGR/GetExerciseDetails?id='.concat(i)
    //   fetch(url4
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
    //       setExpicsdata2(myJson.pic_no)
    //       // ex_pics3.push(ex_pics2)
    
    //     });
    //   }

    //   useEffect(()=>{
    //     getData2()
    //   },[])


    return (

    <div className={classes.grow}>
        {/* <CustomScroller style={{ width: '100%', height: '100%' }}> */}
        <Grid container xs={12} justify="center"  spacing={3}>
          <Grid container item xs={12} justify="center">
            <Paper square className={classes.root}>
              <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="simple tabs example"
              >
              <Tab icon={<PersonIcon />} label="Find A Buddy" {...a11yProps(0)}/>
              <Tab icon={<PeopleIcon />} label="Exercise Group" {...a11yProps(1)}/>
              </Tabs>
            </Paper>
          </Grid>

        
        <TabPanel value={value} index={0}>
        <Grid container xs={12} justify="center"  spacing={3}>
        {nu_data.map((nuser) => (       
            <Grid container item xs={12} justify="center">
            <Paper square className={classes.card}><ExBuddyGrid userid={nuser[0][0].user_id} gender={nuser[0][0].gender} goal={nuser[0][0].goal} fitness={nuser[0][0].fitness_level} location={nuser[0][0].location} age={nuser[1][0].age} count={nuser[2][0].count} expics={ex_pics} exerciseid={group_exercises}/></Paper>
            </Grid>
          ))}
      


        {/* <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ExBuddyGrid userid={123}/></Paper></Grid>
        
        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ExBuddyGrid/></Paper></Grid>

        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ExBuddyGrid/></Paper></Grid> */}
        </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <Grid container xs={12} justify="center"  spacing={3}>

        {/* {nu_data.map((nuser) => (
            <Grid container item xs={12} justify="center">
            <Paper square className={classes.card}><ExGroupGrid userid={nuser[0][0].user_id} gender={nuser[0][0].gender} goal={nuser[0][0].goal} fitness={nuser[0][0].fitness_level} age={nuser[1][0].age} exericeid={group_exercises}/></Paper>
            </Grid>
          ))} */}


        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}>
          <ExGroupGrid 
          grpname={"ISS Exercise Group"} 
          grpid={1} 
          grpsize={5} 
          grplimit={10}
          grpdays={"Tuesday, Friday"} 
          grpgoal={"General Fitness"}
          grpfitness={"Beginner"}  
          exerciselist={[2885,3430,3460,792,1380,4877]} 
          grouppic={"/AGRFrontend/static/images/isslogo.png"}/>
          </Paper>
          </Grid>

        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}>
          <ExGroupGrid 
          grpname={"NUS Gym Club"} 
          grpid={2} 
          grpsize={8} 
          grplimit={15} 
          grpdays={"Monday, Wednesday, Friday, Sunday"} 
          grpgoal={"Muscle Building"}
          grpfitness={"Intermediate"}  
          exerciselist={[204,333,701,724,3593,2913]} 
          grouppic={"/AGRFrontend/static/images/nuslogo.png"}/>
          </Paper>
          </Grid>
        
        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}>
          <ExGroupGrid 
          grpname={"KentRidge Workout Group"} 
          grpid={3} 
          grpsize={4} 
          grplimit={6}
          grpdays={"Weekends"} 
          grpgoal={"Cardio"}
          grpfitness={"Beginner"}  
          exerciselist={[1260,1280,1268,3708,]} 
          grouppic={"/AGRFrontend/static/images/DefaultGroupProfilePic.png"}/>
          </Paper>
          </Grid>

        {/* <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ExGroupGrid exerciselist={[8,56,288]} grouppic={"/AGRFrontend/static/images/nuslogo.png"}/></Paper></Grid>

        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ExGroupGrid exerciselist={[8,56,288]} grouppic={"/AGRFrontend/static/images/DefaultGroupProfilePic.png"}/></Paper></Grid> */}
        </Grid>
        </TabPanel>
        
        </Grid>
        {/* </CustomScroller> */}
        
    </div>
        
      );
}




function ExerciseBuddy() {
  const classes = useStyles();
  const username = Cookies.get('username');

  const GetModel =(username)=> {
    if (username!=''){
    fetch(`/AGR/AskModelToLearn?username=${username}`)
        .then(response => response.json())
        .then(
          (data) => {console.log(data)},
          (error) => {alert(error)}
        )
      }
    else{
      if(username==''){alert('Username is not detected!')}
    }
  }

  return (
    <div className={classes.grow}>
      <MenuBar/>
      <Grid>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() =>GetModel(username) }
          >
            GetUserDataTest
        </Button>
      </Grid>
      <CustomScroller style={{ width: '100%', height: '100%' }}>
        {/* !! not sure how to make it centered yet */}
        <GridList 
          fullWidth 
          // cellHeight='auto' 
          display= 'grid'
          justify-content='center' 
          align-content= 'center'
          >
          {tileData.map((tile) => (
            <ExerciseContainer img1= {tile.img1} img2= {tile.img2} exercise_name= {tile.exercise_name} main_muscle= {tile.main_muscle} detail_muscle= {tile.detail_muscle} other_muscle= {tile.other_muscle} type= {tile.type} mechanics= {tile.mechanics} equipment= {tile.equipment} difficulty= {tile.difficulty} Instructions= {tile.Instructions}/>
          ))}
        </GridList>
      </CustomScroller>
    </div>
  );
}

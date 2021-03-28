import React from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import tileData from './_ExData';
import ExerciseContainer from './components/ExerciseContainer';
import ComplexGrid from './components/BuddyContainerv2';
import MenuBar from './components/MenuBar';
import CustomScroller from 'react-custom-scroller';
// import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';


function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PersonIcon />} label="RECENTS" />
        <Tab icon={<FavoriteIcon />} label="FAVORITES" />
        <Tab icon={<PersonPinIcon />} label="NEARBY" />
      </Tabs>
    </Paper>
  );
}


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


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ExerciseBuddytest() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
    <div className={classes.grow}>
        <MenuBar/>
        <Button variant="contained" color="primary">
            Hello World!!!!
        </Button>
        <CustomScroller style={{ width: '100%', height: '100%' }}>
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
          
        {/* <TabPanel value={value} index={0}> */}
        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ComplexGrid/></Paper></Grid>
        
        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ComplexGrid/></Paper></Grid>

        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ComplexGrid/></Paper></Grid>
        {/* </TabPanel> */}
        {/* <TabPanel value={value} index={1}> */}
        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ComplexGrid/></Paper></Grid>
        
        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ComplexGrid/></Paper></Grid>

        <Grid container item xs={12} justify="center">
        <Paper square className={classes.card}><ComplexGrid/></Paper></Grid>
        {/* </TabPanel> */}
        
        </Grid>
        </CustomScroller>
        
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

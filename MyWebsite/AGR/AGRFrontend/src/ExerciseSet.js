import React from 'react';
import Cookies from 'js-cookie';
import { useLocation , useHistory } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import { MenuIcon , SearchIcon , AccountCircle , MailIcon , NotificationsIcon, MoreIcon } from '@material-ui/icons'
import { AppBar , Menu , MenuItem, Badge , Button , InputBase , IconButton , Grid , GridListTile , GridList , Typography , Toolbar} from '@material-ui/core';
import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  gridcontainer: {
    display: 'grid',
    
  },
  inputRoot: {
    color: 'inherit',
  },
  column: {
    float: 'left',
    width: '50%',
    padding: '20px',
    height: 50,
  },
  row: {
    content: "",
    display: 'table',
    clear: 'both',
  },
}));

export default function ExerciseSetPage() {
  const classes = useStyles();
  const username = Cookies.get('username')
  let history = useHistory()

  const  GoBack=()=>
    {
      Cookies.remove('username')
      history.push('/')
    }
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
    <div 
    class='container-fluid' 
    className={classes.root}
    >
      <div class="row">
        <div class="column">
          <div className={classes.gridList}>
            <img src={tileData[1].img} width="400" height="350"/>        
          </div>
        </div>
        <div class="column">
          <h2>Column 2</h2>
          <p>Some text..</p>
        </div>
      </div>
      
      {/* <GridList 
      cellHeight={250} 
      cellWidth={100}
      className={classes.gridList} 
      cols={2}
      >
        {tileData.map((tile) => (
          
          <GridListTile 
          key={tile.img} 
          // cols={1}
          >
            {console.log(tile)}
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>  */}
    </div>
  );
}
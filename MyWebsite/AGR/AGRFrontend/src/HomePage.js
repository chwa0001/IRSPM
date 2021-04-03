import React,{ useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import {fade,makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Card from '@material-ui/core/Card';
import MenuBar from './components/MenuBar';
import CustomScroller from 'react-custom-scroller';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { DataGrid } from '@material-ui/data-grid';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  paper: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  Images:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HomePage() {
  const classes = useStyles();
  let history = useHistory()
  const username = Cookies.get('username');
  const [search,setSearchData]=useState('');
  const [exerciseList, setExerciseList]=useState([]);
  const columns = [
    { field: 'id', headerName: 'ID',type: 'number', width: 80 },
    { field: 'exercise_name', headerName: 'Exercise Name', width: 130 },
    { field: 'exercise_type', headerName: 'Exercise Type', width: 130 },
    { field: 'mechanics', headerName: 'Mechanics', width: 130 },
    { field: 'equipment', headerName: 'Equipment', width: 130 },
    { field: 'difficulty', headerName: 'Difficulty', width: 130 },
    { field: 'exercise_type', headerName: 'Exercise Type', width: 130 }
  ];

  useEffect(()=> {
    let url =''
    console.log("react response - UseEffect")
    if (search!=''){
      url = `/AGR/GetExerciseList?search=${search}`;
    }
    else{
      url = "/AGR/GetExerciseList";
    }
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      };
        
    fetch(url, requestOptions)
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
          setExerciseList(data.exercises)
          console.log(data.exercises)
        },
        (error) => {alert(error)}
      )

  }, [search]);

  return (
        <div className={classes.paper}>
          <Card>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={exerciseList} columns={columns} pageSize={5} />
          </div>
          </Card>
        </div>
  );
}
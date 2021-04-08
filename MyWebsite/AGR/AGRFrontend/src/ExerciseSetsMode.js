import React,{ useState , useEffect } from 'react';
import Cookies from 'js-cookie';
import {makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import TextField  from '@material-ui/core/TextField';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  table: {
    minWidth: 500,
  },
  input: {
    marginLeft: theme.spacing(4),
    flexGrow: 1,

  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function ExerciseSets() {
  const classes = useStyles();
  let history = useHistory()
  const username = Cookies.get('username');
  const [search,setSearchData]=useState('');
  const [exercisesSet, setExercisesSet]=useState([]);
  const [triggerSearch, SetTriggerSearch] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(0);
  const [exercisesNumber,setExercisesNumber] = useState(50);
  const pre = '/AGRFrontend/static/images/';
  const post = '.jpg';
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { field: 'date', headerName: 'Exercise Date', flex: 1, },
    { field: 'mode', headerName: 'Exercise Type', flex: 1 },
    { field: 'exercises', headerName: 'Exercises', flex: 1},
  ];

  useEffect(()=> {
    let url =''
    console.log("react response - UseEffect")
    if (exercisesNumber>0){
      url = `/AGR/GetSetList?username=${username}&numbers=${exercisesNumber}`;
    }
    else if(exercisesNumber<=0){
      url = `/AGR/GetSetList?username=${username}`;
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
          setExercisesSet(data.set_details)
          console.log(data.set_details)
          setPage(0)
          // alert(`${data.exercises.length} exercises found!`)
        },
        (error) => {alert(error)}
      )

  }, [triggerSearch]);

  const inputSearch = (event) => {
    setSearchData(event.target.value);
  }

  const ExpandCollapse = (rowID) =>{
    if(open===rowID){
      setOpen(0);
    }
    else{
      setOpen(rowID);
    }
  }

  return (
      <div className={classes.paper}>
        <Card>
          <CardHeader style={{marginLeft:10}} title={<Typography variant="h5" component="h2">Exercises History</Typography>}
          />
        </Card>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableCell size='small'/>
                <TableCell size='small' id="id">
                  ID
                </TableCell>
                <TableCell  align="left">
                  Date
                </TableCell>
                <TableCell align="left">
                  Exercise Type
                </TableCell>
                <TableCell align="center">
                  Exercises
                </TableCell>
              </TableHead>

              <TableBody>
                {exercisesSet.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                  <React.Fragment>
                    <TableRow hover key={row.id}>
                      <TableCell size='small'>
                        <IconButton aria-label="expand row" size="small" onClick={()=>ExpandCollapse(row.id)}>
                          {open===row.date ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell size='small'>
                        {row.id}
                      </TableCell>
                      <TableCell size='small'>
                        {row.date}
                      </TableCell>
                      <TableCell align="left">
                        {row.mode}
                      </TableCell>
                      <TableCell align="left">
                        {/* {row.exercises} */}
                        {(row.exercises_name).map(
                          (e) => 
                            <div>{e}</div>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open===row.id} timeout="auto" unmountOnExit> 
                      <CardContent>
                      {(row.exercises).map(
                        (exercise) => 
                        <div>
                        <CardContent>
                          <Typography variant="h4" component="h4">{exercise.exercise_name}</Typography>
                          <Typography variant="body" component="body">{exercise.instruction_text}</Typography>
                        </CardContent>
                        <Grid container spacing={3} direction='row' justify="center"  alignItems="center" style={{flexGrow:1}}>
                          {exercise.pic_no.map(
                            (pic)=>
                            <Grid item xs={12} sm={6}>
                              <CardMedia
                                style = {{ height: 100, paddingTop: '90%'}}
                                image={pre.concat(pic,post)}
                                />
                            </Grid>
                          )}
                        </Grid>
                        </div>
                      )}
                      </CardContent>
                    </Collapse>
                    </TableCell>
                    </TableRow>
                  </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={exercisesSet.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
      </div>
      
  );
}
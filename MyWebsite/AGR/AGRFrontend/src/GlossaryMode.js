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
import IconButton from '@material-ui/core/IconButton';
import { DataGrid } from '@material-ui/data-grid';
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

export default function Glossary() {
  const classes = useStyles();
  let history = useHistory()
  const username = Cookies.get('username');
  const [search,setSearchData]=useState('');
  const [exerciseList, setExerciseList]=useState([]);
  const [triggerSearch, SetTriggerSearch] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { field: 'id', headerName: 'ID',type: 'number', flex: 0.5, },
    { field: 'exercise_name', headerName: 'Exercise Name', flex: 1 },
    { field: 'exercise_type', headerName: 'Exercise Type', flex: 0.7},
    { field: 'equipment', headerName: 'Equipment', flex: 1 },
    { field: 'difficulty', headerName: 'Difficulty', flex: 0.7 },
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
          <CardHeader style={{marginLeft:10}} title={<Typography variant="h5" component="h2">Muscle Building</Typography>}
          />
          <InputBase
            type="search"
            className={classes.input}
            placeholder="Search Exercises"
            inputProps={{ 'aria-label': 'search exercises' }}
            onChange={inputSearch}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={()=>{SetTriggerSearch(!triggerSearch)}}>
            <SearchIcon />
          </IconButton>
          
        </Card>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell/>
                <TableCell>
                  ID
                </TableCell>
                <TableCell  align="left">
                  Exercise Name
                </TableCell>
                <TableCell align="left">
                  Exercise Type
                </TableCell>
                <TableCell align="left">
                  Equipment
                </TableCell>
                <TableCell align="left">
                  Difficulty
                </TableCell>
              </TableHead>
              <TableBody>
                {exerciseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                  <React.Fragment>
                    <TableRow hover key={row.id}>
                      <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={()=>ExpandCollapse(row.id)}>
                          {open===row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">
                        {row.exercise_name}
                      </TableCell>
                      <TableCell align="left">
                        {row.exercise_type}
                      </TableCell>
                      <TableCell align="left">
                        {row.equipment}
                      </TableCell>
                      <TableCell align="left">
                        {row.difficulty}
                      </TableCell>
                    </TableRow>
                    <Box>
                    <Collapse in={open===row.id} timeout="auto" unmountOnExit>
                      hi
                    </Collapse>
                    </Box>
                  </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={exerciseList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
      </div>
      
  );
}
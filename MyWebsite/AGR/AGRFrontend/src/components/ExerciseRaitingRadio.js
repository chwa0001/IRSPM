import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Green2Radio = withStyles({
    root: {
      color: green[200],
      '&$checked': {
        color: green[400],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Red2Radio = withStyles({
    root: {
      color: red[200],
      '&$checked': {
        color: red[400],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);



  
export default function FiveRadioButtons(props) {
  const [selectedValue, setSelectedValue] = React.useState('3');
  const [userStatus, setUserStatus] = useState(-1);

  const username = props.username;
  const exercise_id = props.exercise_id;
  const exercise_name = props.exercise_name;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  function ExerciseRaiting(username,selectedValue,exercise_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          score: selectedValue, 
          exercise_id: exercise_id,
        }),
    };
    console.log(requestOptions)
    if (username!=''){
    fetch('/AGR/ExerciseRating', requestOptions)
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
            setUserStatus(data.status);
          },
          (error) => {alert(error)}
        )
      }
  }


  return (
    <div
    display= 'flex'
    fullWidth 
    cellHeight='auto' 
    display= 'grid'
    justify-content='center' 
    align-content= 'center'
    >
        Horrible!  
      <RedRadio
        checked={selectedValue === '1'}
        onChange={handleChange}
        value="1"
        name="rating"
        inputProps={{ 'aria-label': '1' }}
        disabled= {disablebutton}
      />
      <Red2Radio
        checked={selectedValue === '2'}
        onChange={handleChange}
        value="2"
        name="rating"
        inputProps={{ 'aria-label': '2' }}
      />
      <Radio
        checked={selectedValue === '3'}
        onChange={handleChange}
        value="3"
        color="default"
        name="rating"
        inputProps={{ 'aria-label': '3' }}
      />
      <Green2Radio
        checked={selectedValue === '4'}
        onChange={handleChange}
        value="4"
        name="rating"
        inputProps={{ 'aria-label': '4' }}
      />
      <GreenRadio
        checked={selectedValue === '5'}
        onChange={handleChange}
        value="5"
        name="rating"
        inputProps={{ 'aria-label': '5' }}
      />
        Great!
        <Button
        variant="contained"
        padding={50}
        margin= {1}
        // onClick={() => ExerciseRaiting(username,selectedValue,exercise_id)}
        >
            Submit Rating!
        </Button>
        {/* <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                value="1"
                control={<RedRadio/>}
                label="Need Improvement.."
                labelPlacement="start"
                />
                <FormControlLabel
                value="5"
                control={<GreenRadio/>}
                label="Great!"
                labelPlacement="end"
                />
            </RadioGroup>
        </FormControl> */}

    </div>
  );
}
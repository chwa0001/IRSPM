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
  const username = props.username

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [disablebutton, setDisablebutton] =React.useState(false)


  function ExerciseRaiting(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:username,
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
    else{
      if(username=='') {alert('All field must be field!')}
      else if (username==''){alert('All field must be field!')}
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
        name="radio-button-demo"
        inputProps={{ 'aria-label': '1' }}
        disabled= {disablebutton}
      />
      <Red2Radio
        checked={selectedValue === '2'}
        onChange={handleChange}
        value="2"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '2' }}
      />
      <Radio
        checked={selectedValue === '3'}
        onChange={handleChange}
        value="3"
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '3' }}
      />
      <Green2Radio
        checked={selectedValue === '4'}
        onChange={handleChange}
        value="4"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '4' }}
      />
      <GreenRadio
        checked={selectedValue === '5'}
        onChange={handleChange}
        value="5"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '5' }}
      />
        Great!
        <Button
        variant="contained"
        padding={50}
        margin= {1}
        // onClick={() => ExerciseRaiting(username)}
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
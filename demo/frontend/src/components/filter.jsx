import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import TextDate from "./filter-date.jsx"

export default function Filter() {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Show me</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="everything"
          name="radio-buttons-group"
        >
          <FormControlLabel value="everything" control={<Radio />} label="Everything" />
          <FormControlLabel value="haven't" control={<Radio />} label="Movies I Haven't Seen" />
          <FormControlLabel value="have" control={<Radio />} label="Movies I Haven Seen" />
        </RadioGroup>
      </FormControl>
      <div style={{paddingTop: 20}}>
      <FormGroup>
        <FormLabel id="demo-radio-buttons-group-label">Availabilities</FormLabel>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Search all availabilities" />
        <FormControlLabel control={<Checkbox />} label="Stream" />
        <FormControlLabel control={<Checkbox />} label="Free" />
        <FormControlLabel control={<Checkbox />} label="Ads" />
      </FormGroup>
      </div>
      <div>
        
      </div>
    </div>
  );
}
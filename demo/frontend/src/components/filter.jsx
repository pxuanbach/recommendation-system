import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextDate from "./filter-date.jsx"
import "./filter.css"

export default function Filter() {
  const [value, setValue] = React.useState(2);
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
      <div style={{paddingTop: 20}}>
        <FormLabel id="demo-radio-buttons-group-label">Release Dates</FormLabel>
      </div>
      <div style={{paddingTop: 20}}>
        <FormLabel id="demo-radio-buttons-group-label">Genres</FormLabel>
        <div className='div-genre'>
          <div className='btn-genre'>Chương trình Truyền Hình</div>
          <div className='btn-genre'>Phim Bí Ẩn</div>
          <div className='btn-genre'>Phim Chiến Tranh</div>
          <div className='btn-genre'>Phim Chính Kịch</div>
          <div className='btn-genre'>Phim Gia Đình</div>
          <div className='btn-genre'>Phim Lãng Mạn</div>
          <div className='btn-genre'>Phim Gây Cấn</div>
          <div className='btn-genre'>Phim Hoạt Hình</div>
          <div className='btn-genre'>Phim Hài</div>
          <div className='btn-genre'>Phim Hành Động</div>
          <div className='btn-genre'>Phim Hình Sự</div>
          <div className='btn-genre'>Phim Khoa Học Viễn Tưởng</div>
          <div className='btn-genre'>Phim Kinh Dị</div>
        </div>
      </div>
      <div style={{paddingTop: 20}}>
        <FormLabel id="demo-radio-buttons-group-label">User Score</FormLabel>
        
        <Box
        sx={{
          '& > legend': { mt: 2 },marginTop: 1, display: 'flex', justifyContent: 'center'
        }}
      >
        <Rating
          size="large"
          precision={0.5}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      </div>
    </div>
  );
}
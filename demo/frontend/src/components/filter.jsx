import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextDate from "./filter-date.jsx";
import "./filter.css";

export default function Filter({ user, handleChangeShowType, genres, selected, handleSelectionChanged }) {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Show me</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
          onChange={(e) => handleChangeShowType(e.target.value)}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="Everything"
          />
          {user && (
            <>
              <FormControlLabel
                value="havenot"
                control={<Radio />}
                label="Movies I Haven't Seen"
              />
              <FormControlLabel
                value="have"
                control={<Radio />}
                label="Movies I Have Seen"
              />
            </>
          )}
        </RadioGroup>
      </FormControl>
      {/* <div style={{paddingTop: 20}}>
      <FormGroup>
        <FormLabel id="demo-radio-buttons-group-label">Availabilities</FormLabel>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Search all availabilities" />
        <FormControlLabel control={<Checkbox />} label="Stream" />
        <FormControlLabel control={<Checkbox />} label="Free" />
        <FormControlLabel control={<Checkbox />} label="Ads" />
      </FormGroup>
      </div> */}
      {/* <div style={{ paddingTop: 20 }}>
        <FormLabel id="demo-radio-buttons-group-label">Release Dates</FormLabel>
        <div style={{ paddingTop: 20, lineHeight: 5 }}>
          <TextDate />
        </div>
      </div> */}
      <div style={{ paddingTop: 20 }}>
        <FormLabel id="demo-radio-buttons-group-label">Genres</FormLabel>
        <div className="div-genre">
          {genres && genres.map((genre) => (
            <Chip key={genre.id}
            onClick={() => handleSelectionChanged(genre.name)}
            sx={{
              cursor: 'pointer',
              fontSize: 16,
              paddingY: 2
            }}
            variant={selected.has(genre.name) ? "filled" : "outlined"}
            color={selected.has(genre.name) ? "primary" : "default"}
            label={genre.name}></Chip>
          ))}
          
          {/* <div className="btn-genre">Phim Bí Ẩn</div>
          <div className="btn-genre">Phim Chiến Tranh</div>
          <div className="btn-genre">Phim Chính Kịch</div>
          <div className="btn-genre">Phim Gia Đình</div>
          <div className="btn-genre">Phim Lãng Mạn</div>
          <div className="btn-genre">Phim Gây Cấn</div>
          <div className="btn-genre">Phim Hoạt Hình</div>
          <div className="btn-genre">Phim Hài</div>
          <div className="btn-genre">Phim Hành Động</div>
          <div className="btn-genre">Phim Hình Sự</div>
          <div className="btn-genre">Phim Khoa Học Viễn Tưởng</div>
          <div className="btn-genre">Phim Kinh Dị</div> */}
        </div>
      </div>
      {/* <div style={{paddingTop: 20}}>
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
      </div> */}
    </div>
  );
}

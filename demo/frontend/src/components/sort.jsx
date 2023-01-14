import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
      value: '1',
      label: 'Popularity Descending',
    },
    {
      value: '2',
      label: 'Popularity Ascending',
    },
    {
      value: '3',
      label: 'Rating Descending',
    },
    {
      value: '4',
      label: 'Rating Ascending',
    },
    {
      value: '5',
      label: 'Release Descending',
    },
    {
      value: '6',
      label: 'Release Ascending',
    },
    {
      value: '7',
      label: 'Title (A-Z)',
    },
    {
      value: '8',
      label: 'Title (Z-A)',
    },
  ];

  const Sort = () => {
    return (
        <div>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '28ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Sort Results By"
          defaultValue="1"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </Box>
      </div>
)};

export default Sort;
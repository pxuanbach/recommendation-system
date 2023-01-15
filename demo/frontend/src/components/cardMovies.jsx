import React from "react";
import "./cardMovies.css"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const CardMovies = () => {
    const [value, setValue] = React.useState(5);
    return (
        <div className="container-card-movies">
            <div className="image-card-movies">
            </div>
            <div className="detail-card-movies">
                <div className="name-card-movies">Mèo Đi Hia: Điều ước cuối cùng</div>
                <div className="time-card-movies">Dec 21, 2022</div>
                <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
                >
                    <Rating name="read-only" value={value} readOnly />
                </Box>
            </div>
            
        </div>
    )
};

export default CardMovies;

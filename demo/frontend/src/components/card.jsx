import React from "react";
import "./card.css";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs';
import {processingRuntime} from "../services/movieService";
import { Link } from "react-router-dom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    minWidth: 360,
    maxWidth: 450,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const Card = ({ recommend }) => {
  return (
    
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography variant="h5">{recommend.title}</Typography>
          <Typography><b>Genre:</b> {recommend.genres.replaceAll("|", ", ")}</Typography>
          <Typography><b>Duration:</b> {processingRuntime(recommend.runtime)}</Typography>
          <Typography><b>Release Date:</b> {dayjs(recommend.release_date).format("DD/MM/YYYY")}</Typography>
          <Typography>{recommend.overview}</Typography>
        </React.Fragment>
      }
      placement="right-start"
      followCursor={true}
    >
      <div className="container-card">
        <Link to={`/movies/${recommend.movieId}`}>
        <img className="card" src={recommend.poster_path} />
        <div className="div-detail">
          <div className="name-item">{recommend.title}</div>
          <div className="time-item">{dayjs(recommend.release_date).format("DD/MM/YYYY")}</div>
        </div>
        </Link>
      </div>
    </HtmlTooltip>
  );
};

export default Card;

import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./index.css"

const SignUp = () => {
  return(
    <div className="container">
      <div className="body">
        <div className="div-container-signup">
          <div className="div-left-signup">
            <div className="div-benefit">Benefits of being a member</div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Find something to watch on your subscribed streaming services</p>
            </div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Keep track of your favourite movies and TV shows and get recommendations from them</p>
            </div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Build and maintain a personal watchlist</p>
            </div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Build custom mixed lists (movies and TV)</p>
            </div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Take part in movie and TV discussions</p>
            </div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Contribute to, and improve the information in our database</p>
            </div>
            <div className="div-info-benefit">
            <i class="fas fa-check"></i>
            <p>Log the movies and TV shows you have watcheds</p>
            </div>
          </div>
          <div className="div-right-signup">
            <div className="title-signup">Sign up for an account</div>
            <p>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to to continue.</p>
            <div className="textinput-signup">
              <label>Username</label>
              <input className="input" type="text" name="" placeholder="Nguyễn Tiến Đạt"></input>
            </div>
            <div className="textinput-signup">
              <label>Password (4 characters minimum)</label>
              <input className="input" type="text" name="" placeholder="********"></input>
            </div>
            <div className="textinput-signup">
              <label>Password Confirm</label>
              <input className="input" type="text" name="" placeholder="********"></input>
            </div>
            <div className="textinput-signup">
              <label>Email</label>
              <input className="input" type="text" name="" placeholder="abc@gmail.com"></input>
            </div>
            <p style={{marginTop: 25}}>By clicking the "Sign up" button below, I certify that I have read and agree to the TMDB terms of use and privacy policy.</p>
            <div className="btn-signup">Đăng ký</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;

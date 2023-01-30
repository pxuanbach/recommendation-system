import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import "./index.css"


const Login = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return(
    <div className="background-color">
    <div className="div-login-container">
      <div className="div-login-frame">
        <div className="title-login">
          Đăng nhập
        </div>
        <div className="div-login-text">
          <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1.5, width: '50ch' }, alignItems: 'center', justifyContent:'center',display:'flex', flexDirection:'column', paddingLeft: 3, paddingRight: 3
          }}
          noValidate
          autoComplete="off"
          >
            <TextField id="outlined-basic" label="Email hoặc số điện thoại" variant="outlined" />
            <TextField id="outlined-basic" label="Mật khẩu" variant="outlined" />
          </Box>
          <div className="btn-login">
            Đăng nhập
          </div>
          <div className="div-btn-remember">
            <div className="btn-remember">
              <Checkbox {...label} defaultChecked />
              <div className="btn-text">Ghi nhớ tôi</div>
            </div>
            <div className="btn-text">
              Bạn cần trợ giúp?
            </div>
          </div>
          <div className="text-signup">
            <h3>Bạn mới tham gia Recomender Film?</h3>
            <Link to={"/signup"} className="text-btn-signup">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
};

export default Login;

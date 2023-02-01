import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate } from "react-router-dom";
import "./index.css";
import axiosInstance from "../../services/httpService";
import { getUserByIdEndPoint } from "../../services/endpointService";
import { UserContext } from "../../UserContext";

const Login = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [userId, setUserId] = useState("");
  const {user, setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userId.trim() !== "") {
      try {
        const res = await axiosInstance.get(
          getUserByIdEndPoint({
            userId: userId
          })
        )
        const data = res.data
        localStorage.setItem("userId", data.userId)
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (user) {
    return <Navigate to={"/"}/>
  }
  return (
    <div className="background-color">
      <div className="div-login-container">
        <div className="div-login-frame">
          <div className="title-login">Log In</div>
          <div className="div-login-text">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1.5, width: "50ch" },
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                paddingLeft: 3,
                paddingRight: 3,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Identity of user"
                variant="outlined"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                type="number"
              />
              {/* <TextField id="outlined-basic" label="Mật khẩu" variant="outlined" /> */}
            </Box>
            <div className="btn-login" onClick={handleLogin}>Log In</div>
            <div className="div-btn-remember">
              <div className="btn-remember">
                <Checkbox {...label} defaultChecked />
                <div className="btn-text">Ghi nhớ tôi</div>
              </div>
              <div className="btn-text">Bạn cần trợ giúp?</div>
            </div>
            {/* <div className="text-signup">
              <h3>Bạn mới tham gia Recomender Film?</h3>
              <Link to={"/signup"} className="text-btn-signup">
                Đăng ký ngay
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

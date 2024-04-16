import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../Types/Types";
import './Login.css'

const InputStyle = {
  width: "370px",
  borderColor: "hsla(0, 0%, 18%, 0.8)",
  "&:hover": {
    borderColor: "hsla(0, 0%, 18%, 0.8)",
  },
};

const BtnStyle = {
  color: "hsla(0, 0%, 18%, 0.8)",
  borderColor: "hsla(0, 0%, 18%, 0.8)",
  width: "100px",
  marginTop: "20px",
  marginLeft: "135px",
};

const Login = () => {
  const [user, setUser] = useState<userLogin>({} as userLogin);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/user/login", user)
      .then((res: AxiosResponse) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="loginContainer" onSubmit={handleSubmit}>
        <TextField
          style={InputStyle}
          name="username"
          id="outlined-password-input"
          label="Username"
          type="text"
          onChange={handleChange}
          required
        />
        <TextField
          style={InputStyle}
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button variant="outlined" type="submit" style={BtnStyle}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

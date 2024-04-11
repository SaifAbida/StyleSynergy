import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./Register.css";
import { useState } from "react";
import { userRegister } from "../../Types/Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

const Register = () => {
  const [user, setUser] = useState<userRegister>({} as userRegister);
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
      .post("http://127.0.0.1:8000/user/register", user)
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Unexpected error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form className="registerContainer" onSubmit={handleSubmit}>
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
          name="email"
          id="outlined-password-input"
          label="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <TextField
          name="phoneNumber"
          id="outlined-password-input"
          label="Phone Number"
          type="number"
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button variant="outlined" type="submit" style={BtnStyle}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;

import { useState } from "react";
import "./PasswordReset.css";
import { passwordReset } from "../../Types/Types";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const BtnStyle = {
  color: "hsla(0, 0%, 18%, 0.8)",
  borderColor: "hsla(0, 0%, 18%, 0.8)",
  width: "100px",
  marginTop: "20px",
  marginLeft: "135px",
};
const InputStyle = {
  width: "370px",
  borderColor: "hsla(0, 0%, 18%, 0.8)",
  "&:hover": {
    borderColor: "hsla(0, 0%, 18%, 0.8)",
  },
};

const PasswordReset = () => {
  const [password, setPassword] = useState<passwordReset>({} as passwordReset);
  const token = localStorage.getItem("token");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .patch("http://127.0.0.1:8000/user/reset", password, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
        setPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
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
    <div className="resetContainer shadow-sm p-3 mb-5 bg-body-tertiary rounded">
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          style={InputStyle}
          name="currentPassword"
          label="Current password"
          id="outlined-password-input"
          type="password"
          onChange={handleChange}
          value={password.currentPassword}
          required
        />
        <TextField
          style={InputStyle}
          name="newPassword"
          label="New password"
          id="outlined-password-input"
          type="password"
          onChange={handleChange}
          value={password.newPassword}
          required
        />
        <TextField
          style={InputStyle}
          name="confirmPassword"
          label="Confirm your new password"
          id="outlined-password-input"
          type="password"
          onChange={handleChange}
          value={password.confirmPassword}
          required
        />
        <Button variant="outlined" type="submit" style={BtnStyle}>
          Reset
        </Button>
      </form>
    </div>
  );
};

export default PasswordReset;

import "./Update.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { userUpdate } from "../../Types/Types";
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

const Update = () => {
  const [user, setUser] = useState<userUpdate>({} as userUpdate);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        const { username, email, phoneNumber } = res.data;
        setUser({
          username,
          email,
          phoneNumber,
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
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmitUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .put("http://127.0.0.1:8000/user/update", user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User updated successfully",
          showConfirmButton: false,
          timer: 1500,
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
    <div className="settingsContainer shadow-sm p-3 mb-5 bg-body-tertiary rounded">
      <h1>Update</h1>
      <form onSubmit={handleSubmitUpdate}>
        <TextField
          style={InputStyle}
          name="username"
          id="outlined-password-input"
          type="text"
          required
          onChange={handleChange}
          value={user.username}
        />
        <TextField
          style={InputStyle}
          name="email"
          id="outlined-password-input"
          type="email"
          required
          onChange={handleChange}
          value={user.email}
        />
        <TextField
          style={InputStyle}
          name="phoneNumber"
          id="outlined-password-input"
          type="number"
          required
          onChange={handleChange}
          value={user.phoneNumber}
        />
        <Button variant="outlined" type="submit" style={BtnStyle}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default Update;

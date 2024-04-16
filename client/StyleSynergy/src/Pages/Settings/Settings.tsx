import Update from "../../components/Update/Update";
import PasswordReset from "../../components/PasswordReset/PasswordReset";
import "./Settings.css";
import { Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DeleteBtnStyle = {
  width: "200px",
  margin: "20px auto 40px 150px",
};

const Settings = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleClick() {
    Swal.fire({
      title: "Are you sure you want to delete the account?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cc0000",
      cancelButtonColor: "#2e2e2e",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("http://127.0.0.1:8000/user/delete", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res: AxiosResponse) => {
              Swal.fire({
                title: "Deleted!",
                text: res.data,
                icon: "success",
              });
              localStorage.removeItem("token");
              navigate("/");
            });
        }
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
    <>
      <div className="update">
        <Update />
        <PasswordReset />
      </div>
      <Button
        variant="outlined"
        color="error"
        style={DeleteBtnStyle}
        onClick={handleClick}
      >
        Delete account
      </Button>
    </>
  );
};

export default Settings;

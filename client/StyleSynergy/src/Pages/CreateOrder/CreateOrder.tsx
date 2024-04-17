import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import "./CreateOrder.css";
import { FormEvent, useState } from "react";
import { OrderInput } from "../../Types/Types";
import { Theme, useTheme } from "@mui/material/styles";
import { countryList } from "../../Utils/CountryList";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { globalContext } from "../../App";

const CreateOrder = () => {
  const [input, setInput] = useState<OrderInput>({country : "Tunisia"} as OrderInput);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const theme = useTheme();
  const { setCart, setTotal } = useContext(globalContext) || {
    setCart: () => {},
    setTotal: () => {},
  };

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
    width: "200px",
    margin: "20px auto ",
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  function handleOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/order/", input, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_: AxiosResponse) => {
        setCart([]);
        setTotal(0);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/order");
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
    <div className="orderContainer">
      <form className="order" onSubmit={handleOrder}>
        <h1>Create order:</h1>
        <TextField
          style={InputStyle}
          name="firstName"
          id="outlined-password-input"
          label="First name"
          type="text"
          required
          onChange={handleChange}
        />
        <TextField
          style={InputStyle}
          name="lastName"
          id="outlined-password-input"
          label="Last name"
          type="text"
          required
          onChange={handleChange}
        />
        <TextField
          style={InputStyle}
          name="street"
          id="outlined-password-input"
          label="Street"
          type="text"
          required
          onChange={handleChange}
        />
        <TextField
          style={InputStyle}
          name="city"
          id="outlined-password-input"
          label="City"
          type="text"
          required
          onChange={handleChange}
        />
        <TextField
          style={InputStyle}
          name="postCode"
          id="outlined-password-input"
          label="Post code"
          type="number"
          required
          onChange={handleChange}
        />
        <InputLabel id="demo-multiple-name-label">Country</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          name="country"
          onChange={handleChangeSelect}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          style={InputStyle}
          defaultValue="Tunisia"
          required
        >
          {countryList.map((c) => (
            <MenuItem
              key={c}
              value={c}
              style={getStyles(c, countryList, theme)}
            >
              {c}
            </MenuItem>
          ))}
        </Select>
        <Button variant="outlined" type="submit" style={BtnStyle}>
          Create order
        </Button>
      </form>
    </div>
  );
};

export default CreateOrder;

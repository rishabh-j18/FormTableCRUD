import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { updateUsers } from "../controls/Userservices";

const EditUser = ({ user, onUpdate, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setStreet(user.address.street);
      setCity(user.address.city);
      setCompanyname(user.companyname);
      setWebsite(user.website);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email, phone };
    const data = await updateUsers(updatedUser);
    onUpdate(data);
    onClose();
  };

  return (
    <Box sx={{ padding: 2, width: 300 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          inputProps={{readOnly:true}}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
        label="Street"
        variant="outlined"
        fullWidth
        margin="normal"
        value={street}
        required
        />
        <TextField
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        value={city}
        required
        />
        <TextField
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={companyname}
        />
        <TextField
        label="Website"
        variant="outlined"
        fullWidth
        margin="normal"
        value={website}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditUser;

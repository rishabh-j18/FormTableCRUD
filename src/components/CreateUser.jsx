import React, { useState, useEffect } from "react";
import { createUsers } from "../controls/Userservices"; 
import {
  TextField,
  Button,
  Grid,
  Container,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    companyName: "",
    website: "",
  });

  const [errors, setError] = useState({});

  useEffect(() => {
    if (formData.name.length >= 3) {
      setFormData((prevData) => ({
        ...prevData,
        username: `USER-${formData.name}`,
      }));
    }
  }, [formData.name]);

  const validForm = () => {
    let err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;

    if (!formData.name || formData.name.length < 3) {
      err.name = "Name is required and must be at least 3 characters";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      err.email = "Enter a valid email";
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      err.phone = "Enter a valid 10 digit phone number";
    }
    if (!formData.address.street || !formData.address.city) {
      err.address = "Please enter both Street and City";
    }
    if (formData.companyName && formData.companyName.length < 3) {
      err.companyName =
        "Company name must be at least 3 characters (if provided).";
    }
    if (formData.website && !urlRegex.test(formData.website)) {
      err.website = "A valid URL is required if website is provided.";
    }

    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const [field, subfield] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [field]: { ...prevData[field], [subfield]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validForm()) {
      try {
        const newUser = { ...formData };
        const data = await createUsers(newUser);
        onCreate(data);
        setFormData({
            name: "",
            email: "",
            phone: "",
            username: "",
            address: { street: "", city: "" },
            companyName: "",
            website: "",
          });
        toast.success("User created successfully!");
      } catch (error) {
        toast.error("Failed to create user.");
      }
    } else {
      toast.error("Please correct the highlighted errors.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '10%'}}>
      <Card sx={{border:'1px solid grey', marginBottom:'5px'}}>
        <CardHeader
          sx={{ backgroundColor: "lightgray", textAlign: "center" }}
          title={<Typography variant="h6">Sign Up</Typography>}
        />
      </Card>
      <Card sx={{paddingBottom:2}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                error={!!errors.website}
                helperText={errors.website}
                fullWidth
              />
            </Grid>

            <Grid container item xs={12} justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Create User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
      <ToastContainer/>
    </Container>
  );
};

export default CreateUser;

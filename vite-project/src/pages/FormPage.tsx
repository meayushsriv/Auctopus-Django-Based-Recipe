import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const FormPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { setUser, alertMessage, setAlertMessage } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.from) {
      setAlertMessage("Please enter your details before accessing this page.");
    }
  }, [location.state, setAlertMessage]);

  const handleSubmit = () => {
    if (name && phone && email) {
      setUser({ name, phone, email });
      setAlertMessage("");
      navigate("/second");
    }
  };

  return (
    <div>
      <Typography variant="h4">User Information</Typography>
      {alertMessage && <Alert severity="warning">{alertMessage}</Alert>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default FormPage;

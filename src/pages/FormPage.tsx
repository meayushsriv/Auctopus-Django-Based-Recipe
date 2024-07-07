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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md space-y-6">
      <Typography variant="h4" className="mb-4">
        User Information
      </Typography>
      {alertMessage && (
        <Alert severity="warning" className="mb-4">
          {alertMessage}
        </Alert>
      )}
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <TextField
        label="Phone"
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
};

export default FormPage;

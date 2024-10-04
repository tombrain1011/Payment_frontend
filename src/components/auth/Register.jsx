import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import Loader from './Loader'; 

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setShowLoader(false); 

    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 300);

    try {
      const response = await axios.post('https://2849-64-32-17-130.ngrok-free.app/register', {
        email,
        password,
      });
      console.log(response.data);
      
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate('/createLink');
    } catch (error) {
      setMessage('Error registering. Please try again.');
    } finally {
      clearTimeout(loaderTimeout); 
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          inputProps={{ minLength: 8 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading && showLoader ? <Loader /> : 'Register'}
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Register;

import React, { useState } from 'react';
import Loader from './Loader'; // Import your loader component
import {
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // New state for loader visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setShowLoader(false); 
    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 300);

    try {
      const response = await axios.post('https://2849-64-32-17-130.ngrok-free.app/login', {
        email,
        password,
      });
      console.log(response);
      
      if (response.data.success) {
        setErrorMessage('Login Success.');
        localStorage.setItem('token', response.data.token);
        navigate('/createLink');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
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
        Login
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
          {loading && showLoader ? <Loader /> : 'Login'}
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Login;

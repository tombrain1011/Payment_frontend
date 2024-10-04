import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Toolbar
} from '@mui/material';
import axios from 'axios';

const PaymentLinkForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [description, setDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    if (!token) {
      navigate('/');
     
    }
  }, [navigate])
  
  const createPaymentLink = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:5000/create-payment-link`, {
        amount: parseInt(amount), 
        currency,
        description,
        expirationDate, 
      });
      console.log(response.data.url);
      
      setPaymentLink(response.data.url);
      setOpenSnackbar(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating payment link:', error);
      setErrorMessage('Failed to create payment link. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', paddingTop: '50px' }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1 }}>
          Create Payment Link
        </Typography>
      </Toolbar>
      <form onSubmit={createPaymentLink}>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            label="Currency"
          >
            <MenuItem value="usd">USD</MenuItem>
            <MenuItem value="eur">EUR</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Expiration Date"
          type="date"
          fullWidth
          variant="outlined"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Payment Link
        </Button>
      </form>
      {paymentLink && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="body1">Payment Link:</Typography>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">{paymentLink}</a>
        </div>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={errorMessage ? "error" : "success"}>
          {errorMessage || "Payment link created successfully!"}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default PaymentLinkForm;

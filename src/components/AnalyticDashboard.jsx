import React, { useEffect, useState, useCallback } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Toolbar,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnalyticsDashboard() {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState({ date: '', amount: '', currency: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  
  const fetchPayments = useCallback(async () => {
    try {
      console.log(filter);
      
      const response = await axios.post('http://127.0.0.1:5000/analytics', filter);
      setPayments(response.data.payments);
     
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setSnackbarMessage('Failed to fetch payment data.');
      setOpenSnackbar(true);
    }
  }, [filter]);

  useEffect(() => {
    fetchPayments();
    const token = localStorage.getItem('token'); 
    console.log(token);
    
    if (!token) {
      navigate('/');
    }
  }, [navigate, fetchPayments]);
  
  const handleFilter = () => {
    fetchPayments();
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', paddingTop: '50px', width: "800px" }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1 }}>
          Analytics Dashboard
        </Typography>
      </Toolbar>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Filter by Date"
            type="date"
            fullWidth
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Filter by Amount"
            type="number"
            fullWidth
            value={filter.amount}
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Filter by Currency</InputLabel>
            <Select
              value={filter.currency}
              onChange={(e) => setFilter({ ...filter, currency: e.target.value })}
              label="Filter by Currency"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleFilter}>
        Apply Filters
      </Button>

      <TableContainer style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length > 0 ? (
              payments
                .slice()
                .reverse()
                .map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.currency}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell style={{color: "green", fontSize: "18px"}}>{payment.status}</TableCell>
                    <TableCell>{payment.payment_method}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No payment data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default AnalyticsDashboard;

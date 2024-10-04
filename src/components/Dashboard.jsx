import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Payment Link Application
      </Typography>
    </Paper>
  );
};

export default Dashboard;

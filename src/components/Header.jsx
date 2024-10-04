// Header.js
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
      navigate('/login');
  } 
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Payment Link Application
        </Typography>
        {token? (
        <>
          <Button color="inherit" component={Link} to="/createLink" style={{ border: "1px solid white", borderRadius: "5px", marginRight: "20px"}}>
            Create Payment Link
          </Button>
          <Button color="inherit" component={Link} to="/analytics" style={{ border: "1px solid white", borderRadius: "5px", marginRight: "20px"}}>
            Analytics Dashboard
          </Button>
          <Button color="inherit" onClick={handleLogout} style={{ border: "1px solid white", borderRadius: "5px" }}>
              Logout
            </Button>
        </>
        ):(
        <>
          <Button color="inherit" component={Link} to="/login" style={{ border: "1px solid white", borderRadius: "5px", marginRight: "20px"}}>
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register" style={{ border: "1px solid white", borderRadius: "5px", marginRight: "20px"}}>
            Register
          </Button>
        </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

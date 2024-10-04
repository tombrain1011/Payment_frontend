import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { Container } from '@mui/material';
import PaymentLinkForm from './components/PaymentLinkForm';
import AnalyticsDashboard from './components/AnalyticDashboard';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    if (token) {
    }
  }, []);


  return (
    <Router>
        <Header/>
        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createLink" element={<PaymentLinkForm />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        </Container>
    </Router>
  );
}

export default App;

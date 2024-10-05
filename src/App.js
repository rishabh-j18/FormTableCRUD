import React from 'react';
import { Container, Typography } from '@mui/material';
import Home from './components/Home';

function App() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        User Management
      </Typography>
      <Home />
    </Container>
  );
}

export default App;

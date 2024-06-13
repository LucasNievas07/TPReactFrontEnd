import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const [clave, setClave] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/usuario/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreUsuario, clave })
    });

    if (response.ok) {
      const user = await response.json();
      login(user);
      navigate('/');
    } else {
      const errorMessage = await response.text();
      alert(errorMessage);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Card sx={{ maxWidth: 400, padding: 3, border: '1px solid #ccc' }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Nombre de Usuario"
              fullWidth
              margin="normal"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
            <TextField
              label="Clave"
              type="password"
              fullWidth
              margin="normal"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#1976D2',
                },
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

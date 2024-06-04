//Registro.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';

const Registro: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const rol = esAdmin ? 'Admin' : 'Operador';
    const response = await fetch('http://localhost:8080/usuario/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreUsuario, clave, rol })
    });
    if (response.ok) {
      alert('Usuario registrado correctamente');
      navigate('/login');
    } else {
      alert('Error al registrar el usuario');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Card sx={{ maxWidth: 400, padding: 3, border: '1px solid #ccc' }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Registro
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Nombre de Usuario"
              fullWidth
              margin="normal"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required  // Campo obligatorio
            />
            <TextField
              label="Clave"
              type="password"
              fullWidth
              margin="normal"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required  // Campo obligatorio
            />
            <FormControlLabel
              control={<Checkbox checked={esAdmin} onChange={(e) => setEsAdmin(e.target.checked)} />}
              label="Es Admin"
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
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Registro;

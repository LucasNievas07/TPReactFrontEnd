import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Donde Estamos', path: '/donde-estamos' },
  { name: 'Productos', path: '/productos' },
  { name: 'Carrito', path: '/carrito' },
];

export function Navbar() {
  const { isLoggedIn, username, role, logout } = useAuth(); // Obtener el rol del usuario
  const navigate = useNavigate();

  const isAdmin = role === 'Admin'; // Verificar si el rol es "Admin"

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          MUSICAL HENDRIX
        </Typography>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}
            >
              <Typography variant="h6" color="inherit">{page.name}</Typography>
            </Link>
          ))}
          {isLoggedIn && isAdmin && ( // Mostrar el enlace solo si está logueado y es Admin
            <Link
              to="/grilla"
              style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}
            >
              <Typography variant="h6" color="inherit">Admin</Typography>
            </Link>
          )}
        </Box>
        {isLoggedIn ? (
          <>
            <Typography variant="h6" color="inherit" style={{ marginRight: '20px' }}>
              {username}
            </Typography>
            <Button color="inherit" onClick={logout} style={{ marginRight: '20px' }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')} style={{ marginRight: '20px' }}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/registro')}>
              Registro
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

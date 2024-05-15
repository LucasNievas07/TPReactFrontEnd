import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Donde Estamos', path: '/donde-estamos' },
  { name: 'Productos', path: '/productos' },
  {name: 'Carrito', path: '/carrito'}
];

export function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          MUSICAL HENDRIX
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}
            >
              <Typography variant="h6" color="inherit">{page.name}</Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

import * as React from 'react';
import { Paper, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CarruselCardProps {
  id: string,
  imagen: string,
  instrumento: string,
}

const CarruselCard: React.FC<CarruselCardProps> = ({ id, imagen, instrumento }) => (
  <Link to={`/instrumento/${id}`} style={{ textDecoration: 'none' }}>
    <Paper variant="outlined" sx={{ maxWidth: 345, marginTop: '2%', border: 'none', boxShadow: 'none' }}>
      <CardMedia
        component="img"
        image={`${imagen}`}
        alt={instrumento}
        style={{ objectFit: 'contain', width: '100%', height: '20rem' }}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary" fontFamily={"Segoe UI"} >
          {instrumento}
        </Typography>
      </CardContent>
    </Paper>
  </Link>
);

export default CarruselCard;

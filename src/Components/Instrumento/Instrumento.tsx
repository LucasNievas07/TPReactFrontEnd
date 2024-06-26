import * as React from 'react';
import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { useResize } from '../../Hooks/useResize';

const truncate = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...'; 
  }
  return text;
};

export const Instrumento: React.FC<InstrumentoProps> = ({ item }) => {
  const { ref, dimensions } = useResize();

  return (
    <Card
      variant="outlined"
      ref={ref}
      sx={{ marginTop: '2%', marginBottom: '4%', marginLeft: '3.5%', marginRight: '6%',
        boxShadow: 4, display: 'flex', minWidth: '75%' }}>
      <CardMedia
        component="img"
        sx={{ width: dimensions.width, height: dimensions.height, flexShrink: 0, objectFit: 'contain' }}
        image={`${item.imagen}`}
        alt={item.instrumento}
      />
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5" color="text.primary" fontFamily={"Segoe UI"}>
              {truncate(item.instrumento, 50)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" color="text.primary" fontFamily={"sans-serif"}>
              $ {item.precio}
            </Typography>
          </Grid>
          {item.costoEnvio !== 'G' && (
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="#D6913A" style={{ marginRight: '8px' }}>
                  Costo de Envio Interior de Argentina: ${item.costoEnvio}
                </Typography>
              </div>
            </Grid>
          )}
          {item.costoEnvio === 'G' && (
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color:'#39B54A' }}>
                <FaTruck fontSize={'1.5vw'}/>
                <span style={{marginLeft:'0.5vw'}}>Envío gratis a todo el país</span>
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
              {item.cantidadVendida} vendidos
            </Typography>
          </Grid>
        </Grid>
        <CardActions>
          <Link to={`/instrumento/${item.id}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#1976D2',
                  '& .detalle_button': {
                    color: '#1976D2',
                  },
                },
              }}
            >
              <FaMagnifyingGlass/>
              <Typography
                className="detalle_button"
                variant='button'
                color="white"
                fontFamily={"sans-serif"}
                sx={{ marginLeft: '0.5vw' }}
              >
                Ver Detalle
              </Typography>
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

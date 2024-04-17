import * as React from 'react';
import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Instrumento: React.FC<InstrumentoProps> = ({ item }) => (
  <Card variant="outlined" sx={{ marginTop: '2%', marginBottom: '2%', marginLeft: '8%', marginRight: '8%',
  boxShadow: 6, display: 'flex'}}>
    <CardMedia
      component="img"
      sx={{ width: 250, flexShrink: 0 }}
      image={`/img/${item.imagen}`}
      alt={item.instrumento}
    />
    <CardContent sx={{ flex: '1 0 auto' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.primary" fontFamily={"Segoe UI"}>
            <h2>{item.instrumento}</h2>
          </Typography> 
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
            <h4>$ {item.precio}</h4>
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
            <Typography variant="body2" color="#39B54A">
              <img src="/img/camion.png" alt="Imagen" style={{ marginRight: '8px', height: '24px' }} />
              Envio gratis a todo el país
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
            <p>{item.cantidadVendida} vendidos</p>
          </Typography>
        </Grid>
      </Grid>
      <CardActions>
        <Link to={`/instrumento/${item.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" size="small" color="primary">
            Ver Detalle
          </Button>
        </Link>
      </CardActions>
    </CardContent>
  </Card>
);

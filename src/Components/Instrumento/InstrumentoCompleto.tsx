import * as React from 'react';
import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Card from '@mui/joy/Card';

export const InstrumentoCompleto: React.FC<InstrumentoProps> = ({ item }) => (
<Grid container spacing={2} sx={{marginTop:'2%'}}>
  <Grid item xs={7} sx={{marginLeft:'5%'}}>
    <Card variant="plain">
      <CardMedia
        component="img"
        sx={{ width: 500, flexShrink: 0, marginLeft:'15%'}}
        image={`/img/${item.imagen}`}
        alt={item.instrumento}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary" fontFamily={"Segoe UI"}>
          <p>Descripción:</p>
          {item.descripcion}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={4}>
    <Card variant="outlined">
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              {item.cantidadVendida} vendidos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="text.primary" fontFamily={"Segoe UI"}>
              {item.instrumento}
            </Typography> 
          </Grid>
          <Grid item xs={12} sx={{marginBottom:'5%', marginTop:'5%'}}>
            <Typography variant="h3" color="text.primary" fontFamily={"sans-serif"}>
              $ {item.precio}
            </Typography>          
          </Grid>
          <Grid item xs={12}>
            <Typography color="text.primary" fontFamily={"Segoe UI"}>
              Marca: {item.marca}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="text.primary" fontFamily={"Segoe UI"}>
              Modelo: {item.modelo}
            </Typography>
          </Grid>
          {item.costoEnvio !== 'G' && (
            <Grid item xs={12} sx={{marginTop:'10%', marginBottom:'20%'}}>
              <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                Costo Envio: 
              </Typography>
              <Typography variant="body2" color="#D6913A" style={{ marginRight: '8px' }} fontFamily={"sans-serif"}>
                ${item.costoEnvio}
              </Typography>
            </Grid>
          )}
          {item.costoEnvio === 'G' && (
            <Grid item xs={12} sx={{marginTop:'10%', marginBottom:'20%'}}>
              <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                Costo Envio: 
              </Typography>
              <Typography variant="body2" color="#39B54A"  fontFamily={"sans-serif"}>
                <img src="/img/camion.png" alt="Imagen" style={{ marginRight: '8px', height: '24px' }} />
                Envio gratis
              </Typography>
            </Grid>
          )}
        </Grid>
        <CardActions>
          <Button variant="outlined" size="medium" color="primary">
            <Typography variant='button'>
              Agregar al carrito
            </Typography>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  </Grid>
</Grid>
);
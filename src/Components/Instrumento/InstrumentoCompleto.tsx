import * as React from 'react';
import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Card from '@mui/joy/Card';
import { FaTruck } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";

export const InstrumentoCompleto: React.FC<InstrumentoProps> = ({ item }) => {
  const [dimensions, setDimensions] = React.useState({ width: 0.1, height: 0.1 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setDimensions({ width: width * 1, height: height * 1 });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: '2%' }}>
      <Grid item xs={7} sx={{ marginLeft: '5%' }}>
        <Card variant="plain" ref={cardRef}>
          <CardMedia
            component="img"
            sx={{ width: dimensions.width, height: dimensions.height, flexShrink: 0, objectFit: 'contain' }}
            image={`${item.imagen}`}
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
              <Grid item xs={12} sx={{ marginBottom: '5%', marginTop: '5%' }}>
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
                <Grid item xs={12} sx={{ marginTop: '10%', marginBottom: '20%' }}>
                  <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                    Costo Envio:
                  </Typography>
                  <Typography variant="body2" color="#D6913A" style={{ marginRight: '8px' }} fontFamily={"sans-serif"}>
                    ${item.costoEnvio}
                  </Typography>
                </Grid>
              )}
              {item.costoEnvio === 'G' && (
                <Grid item xs={12} sx={{ marginTop: '10%', marginBottom: '20%' }}>
                  <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                    Costo Envio:
                  </Typography>
                  <Typography variant="body2" color="#39B54A" fontFamily={"sans-serif"}>
                    <FaTruck fontSize={'1.5vw'}/>    
                    <small style={{fontSize:'1.1vw', marginLeft:'0.5vw'}}>Envio gratis </small>                                                     
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                '&:hover': {
                  backgroundColor: '#1976D2',
                  color: 'white',
                  '& .carrito_button': {
                    color: 'white',
                  },
                },
              }}
            >
              <IoBagCheckOutline fontSize={'1.5vw'} />
              <Typography className='carrito_button' variant='button' sx={{marginLeft:'0.5vw'}}>
                Agregar al carrito
              </Typography>
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

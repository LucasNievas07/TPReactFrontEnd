import React, { useContext, useEffect, useState, useRef } from 'react';
import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Paper, Button, CardContent, CardMedia, Grid, Typography, IconButton } from '@mui/material';
import { FaTruck } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { CarritoContext } from '../../Context/CarritoContext';
import { Add, Remove } from '@mui/icons-material';
import { useAuth } from '../../Context/AuthContext';

export const InstrumentoCompleto: React.FC<InstrumentoProps> = ({ item }) => {
  const [dimensions, setDimensions] = useState({ width: 0.1, height: 0.1 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { agregarAlCarrito, reducirCantidadCarrito, obtenerCantidadEnCarrito } = useContext(CarritoContext);
  const { isLoggedIn } = useAuth();
  const cantidadEnCarrito = isLoggedIn ? obtenerCantidadEnCarrito(item.id) : 0;

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setDimensions({ width: width * 1, height: height * 1.8 });
      }
    };

    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: '2%' }}>
      <Grid item xs={7} sx={{ marginLeft: '5%' }}>
        <Paper ref={cardRef} sx={{ border: 'none', boxShadow: 'none' }}>
          <CardMedia
            component="img"
            sx={{ width: dimensions.width, height: dimensions.height, flexShrink: 0, objectFit: 'contain' }}
            image={`${item.imagen}`}
            alt={item.instrumento}
          />
          <CardContent>
            <Typography variant="body1" color="text.primary" fontFamily={"Segoe UI"}>
              <strong>Descripción:</strong> {item.descripcion}
            </Typography>
          </CardContent>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{ border: 'none', boxShadow: 'none' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  {item.cantidadVendida} vendidos
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="h5" color="text.primary" fontFamily={"Segoe UI"}>
                  {item.instrumento}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '5%', marginTop: '5%' }}>
                <Typography variant="h3" component="h3" color="text.primary" fontFamily={"sans-serif"}>
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
                <Grid item xs={12} sx={{ marginTop: '5%'}}>
                  <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                    Costo Envio:
                  </Typography>
                  <Typography variant="body2" color="#D6913A" style={{ marginRight: '8px' }} fontFamily={"sans-serif"}>
                    Interior de Argentina: ${item.costoEnvio}
                  </Typography>
                </Grid>
              )}
              {item.costoEnvio === 'G' && (
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color:'#39B54A', marginTop:'5%' }}>
                    <FaTruck fontSize={'1.5vw'}/>
                    <span style={{marginLeft:'0.5vw'}}>Envío gratis a todo el país</span>
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} sx={{ marginBottom: '5%', marginTop:'5%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => reducirCantidadCarrito(item.id)} disabled={!isLoggedIn}>
                    <Remove />
                  </IconButton>
                  <Typography variant="body1" sx={{ margin: '0 1rem' }}>
                    {cantidadEnCarrito}
                  </Typography>
                  <IconButton onClick={() => agregarAlCarrito(item)} disabled={!isLoggedIn}>
                    <Add />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
};

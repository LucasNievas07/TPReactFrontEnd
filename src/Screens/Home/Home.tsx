import { Typography } from "@mui/material";
import { Carrusel } from "../../Components/Carrusel/Carrusel";
import FadeInContent from '../FadeInContent/FadeInContent ';

export const Home = () => {
  return (
    <FadeInContent>
      <>
        <Carrusel/>
        <Typography variant="h5" color="text.primary" fontFamily={"sans-serif"} sx={{marginLeft:'10%', marginRight:'10%'}}>
          Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
          experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
          mejores elecciones para tu compra musical.
        </Typography>
      </>
    </FadeInContent>
  );
};

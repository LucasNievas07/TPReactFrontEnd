import { useState } from "react";
import { Carousel } from "react-bootstrap";
import CarruselCard from "./CarruselCard";
import 'bootstrap/dist/css/bootstrap.min.css';

const Carrusel = () => {
  // Lista de URLs de imágenes hardcodeadas
  const [data] = useState([
    {
      id: "1",
      imagen: "https://scontent.fmdz7-1.fna.fbcdn.net/v/t39.30808-6/415470561_2254282524775386_5235040893101975099_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LAMDQIuFjQEQ7kNvgHpMqio&_nc_ht=scontent.fmdz7-1.fna&oh=00_AYB_BeNav4eHXoLAaETuYhsENd-hVoJAX6-UaUrovSbwXQ&oe=66642372",
      instrumento: "Instrumento 1"
    },
    {
      id: "2",
      imagen: "https://scontent.fmdz7-1.fna.fbcdn.net/v/t31.18172-8/11038150_344150299121961_500843070549337027_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iOopo-e9beQQ7kNvgFrpnbT&_nc_ht=scontent.fmdz7-1.fna&oh=00_AYA1pq29-0VZZkGDIBRJcNBcUzkRxuClS977R5dEhBnuEg&oe=6685E05E",
      instrumento: "Instrumento 2"
    },
    {
      id: "3",
      imagen: "https://scontent.fmdz7-1.fna.fbcdn.net/v/t1.18169-9/11021205_344150289121962_7492415260799746056_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=r_jqPMty8TYQ7kNvgHxaRCW&_nc_ht=scontent.fmdz7-1.fna&oh=00_AYDpncJSzsnexSZKG38hj74DLncf3gwxFw4BD9tKxVbWnQ&oe=6685CF44",
      instrumento: "Instrumento 3"
    }
  ]);

  return (
    <Carousel data-bs-theme="dark" style={{ marginLeft: '10%', marginRight: '10%', height: '90vh' }}>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <div style={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
            <CarruselCard
              id={item.id}
              imagen={item.imagen}
              instrumento={item.instrumento}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carrusel;

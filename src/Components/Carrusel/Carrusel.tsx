import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import CarruselCard from "./CarruselCard";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Carrusel = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/instrumento/masVendidos');
        const data = await response.json();          
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <>
      <Carousel data-bs-theme="dark" style={{marginLeft:'10%', marginRight:'10%'}}>
        {data.map((item, index) => (
          <Carousel.Item key={index}>
            <div style={{ display: 'flex', justifyContent: 'center',  height:'60vh', marginBottom:'5rem' }}>
              <CarruselCard
                id={item.id}
                imagen={item.imagen}
                instrumento={item.instrumento}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

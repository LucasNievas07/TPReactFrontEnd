import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Instrumento } from '../../Components/Instrumento/Instrumento';
import { InstrumentoNoItemProps } from '../../Types/InstrumentoProps';
import FadeInContent from '../FadeInContent/FadeInContent';

const Productos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InstrumentoNoItemProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/instrumento');
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.instrumento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FadeInContent>
      <TextField
        label="Buscar Instrumento"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: '1%', marginTop:'1%', marginLeft:'3%', paddingRight:'8.5%' }}
      />
      {filteredData.map((item) => (
        <Instrumento key={item.id} item={item} />
      ))}
    </FadeInContent>
  );
};

export default Productos;

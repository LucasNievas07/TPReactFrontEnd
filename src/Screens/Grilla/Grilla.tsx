import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, MenuItem, SelectChangeEvent, Box, Grid, Typography } from '@mui/material';
import { ModalInstrumento } from '../../Components/ModalInstrumento';
import { InstrumentoNoItemProps } from '../../Types/InstrumentoProps';
import { deleteData, getData } from '../../Api/genericCalls';
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from '../../Context/AuthContext';
import FadeInContent from '../FadeInContent/FadeInContent';
import { CategoriaProps } from '../../Types/CategoriaProps';

const Grilla: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InstrumentoNoItemProps[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState<InstrumentoNoItemProps | undefined>(undefined);
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');
  const { role } = useAuth();

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNew = () => setSelectedInstrumento(undefined);

  const handleSelection = (instrumento: InstrumentoNoItemProps) => {
    setSelectedInstrumento(instrumento);
    handleOpen();
  };

  const handleDelete = async (instrumento: InstrumentoNoItemProps) => {
    await deleteData(`http://localhost:8080/instrumento/${instrumento.id}`);
    setData(data.filter((item) => item.id !== instrumento.id));
  };

  useEffect(() => {
    const fetchDataCategorias = async () => {
      try {
        const categoriaData = await getData<CategoriaProps[]>('http://localhost:8080/categoria');
        setCategorias(categoriaData);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchDataCategorias();
  }, []);

  const filteredData = data.filter(
    (item) => selectedCategoria === 'todos' || item.categoria?.id?.toString() === selectedCategoria
  );

  return (
    <FadeInContent>
      <>
        {role === 'Admin' && (
          <Button
            variant='outlined' size="large" color="primary"
            sx={{ 
              margin: '2%',
              '&:hover': {
                backgroundColor: '#1976D2',
                color: 'white',
              }, 
            }}
            onClick={() => {
              handleNew();
              handleOpen();
            }}
          >
            Crear Nuevo Instrumento
          </Button>
        )}

        <Select
          value={selectedCategoria}
          onChange={(event: SelectChangeEvent) => {
            setSelectedCategoria(event.target.value);
          }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {categorias.map((categoria: CategoriaProps) => (
            <MenuItem key={categoria.id?.toString() ?? ''} value={categoria.id?.toString() ?? ''}>
              {categoria.denominacion}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ marginTop: '2%', marginBottom: '2%', marginLeft: '8%', marginRight: '4%', width: '80%' }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="h6">Instrumento</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Marca</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Modelo</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Precio</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Categoría</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">Acciones</Typography>
            </Grid>
          </Grid>
          {filteredData.map((item: InstrumentoNoItemProps) => (
            <Grid container spacing={2} key={item.id}>
              <Grid item xs={2}>
                <Typography>{item.instrumento}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.marca}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.modelo}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.precio}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.categoria?.denominacion}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleSelection(item)}>
                  <LuPencil />
                </Button>
                <Button onClick={() => handleDelete(item)}>
                  <FaRegTrashAlt />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Box>
        
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box>
            <ModalInstrumento
              existingInstrumento={selectedInstrumento}
              onClose={handleClose}
              onSave={() => {
                handleClose();
                // Actualizar la lista de instrumentos después de guardar
                // fetchData();
              }}
            />
          </Box>
        </Modal>
      </>
    </FadeInContent>
  );
};

export default Grilla;

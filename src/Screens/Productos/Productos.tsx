import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Select, MenuItem, SelectChangeEvent, Box, Grid, Typography } from '@mui/material';
import { Instrumento } from '../../Components/Instrumento/Instrumento';
import { ModalInstrumento } from '../../Components/ModalInstrumento';
import { Categoria, InstrumentoNoItem } from '../../Types/InstrumentoProps';
import { deleteData, getData } from '../../Api/genericCalls';
import FadeInContent from "../FadeInContent/FadeInContent ";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

export const Productos = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InstrumentoNoItem[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState<InstrumentoNoItem | undefined>(undefined);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');

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

  const handleSelection = (instrumento: InstrumentoNoItem) => setSelectedInstrumento(instrumento);

  const handleDelete = async (instrumento: InstrumentoNoItem) => {
    await deleteData(`http://localhost:8080/instrumento/${instrumento.id}`);
    handleClose();
  };

  useEffect(() => {
    const fetchDataCategorias = async () => {
      try {
        const categoriaData = await getData<Categoria[]>('http://localhost:8080/categoria');
        setCategorias(categoriaData);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchDataCategorias();
  }, []);

  return (
    <FadeInContent>
      <>
        <div>
          <Button
            variant='outlined' size="large" color="primary"
            sx={{ 
              margin: '25px',
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

          <Select
            value={selectedCategoria}
            onChange={(event: SelectChangeEvent) => {
              setSelectedCategoria(event.target.value);
            }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            {categorias.map((categoria: Categoria) => (
              <MenuItem key={categoria.id?.toString() ?? ''} value={categoria.id?.toString() ?? ''}>
                {categoria.denominacion}
              </MenuItem>
            ))}
          </Select>

          {data
            .filter(
              (item: InstrumentoNoItem) =>
                selectedCategoria === 'todos' || item.categoria?.id?.toString() === selectedCategoria
            )
            .map((item: InstrumentoNoItem) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{ maxWidth: 1200, marginLeft: '3%', marginBottom: '2%', display: 'flex' }}
              >
                <Instrumento key={item.id} item={item} />
                <Grid container sx={{marginTop:'15vh',marginBottom:'10vh'}}>
                  <Grid item xs={12}>
                    <Button
                    onClick={() => {
                      handleSelection(item);
                      handleOpen();
                    }}
                    variant="contained" size="small" color="primary"
                    sx={{
                      width:'8vw',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#1976D2',
                        '& .editar_button': {
                          color: '#1976D2',
                        },
                      },
                    }}
                    >
                      <LuPencil />
                      <Typography className='editar_button' variant='button' color="white" fontFamily={"sans-serif"} sx={{marginLeft:'0.5vw'}}>
                        Editar
                      </Typography>  
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                    onClick={() => {
                      handleDelete(item);
                    }}
                    variant="contained" size="small" color="primary"
                    sx={{
                      width:'8vw',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#1976D2',
                        '& .eliminar_button': {
                          color: '#1976D2',
                        },
                      },
                    }}
                    >
                      <FaRegTrashAlt />
                      <Typography className='eliminar_button' variant='button' color="white" fontFamily={"sans-serif"} sx={{marginLeft:'0.5vw'}}>
                        Eliminar
                      </Typography>  
                    </Button>
                  </Grid>
                </Grid>
                

              </Card>
            ))}

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                width: '50%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '10px',
              }}
            >
              <ModalInstrumento existingInstrumento={selectedInstrumento ? selectedInstrumento : undefined} onClose={handleClose} />
            </Box>
          </Modal>
        </div>
      </>
    </FadeInContent>
  );
};

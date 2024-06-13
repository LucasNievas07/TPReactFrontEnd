import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, MenuItem, SelectChangeEvent, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
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

  const handleGeneratePdf = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/instrumento/${id}/pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Instrumento_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } else {
        console.error('Error generating PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

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
          sx={{ margin: '2%' }}
        >
          <MenuItem value="todos">Todos</MenuItem>
          {categorias.map((categoria: CategoriaProps) => (
            <MenuItem key={categoria.id?.toString() ?? ''} value={categoria.id?.toString() ?? ''}>
              {categoria.denominacion}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ marginTop: '2%', marginBottom: '2%', marginLeft: '8%', marginRight: '4%', width: '80%' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', minWidth: '100px' }}>Instrumento</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', minWidth: '100px' }}>Marca</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', minWidth: '100px' }}>Modelo</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', minWidth: '100px' }}>Precio</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', minWidth: '100px' }}>Categoría</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', minWidth: '150px' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item: InstrumentoNoItemProps) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ textAlign: 'center' }}>{item.instrumento}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{item.marca}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{item.modelo}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{item.precio}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{item.categoria?.denominacion}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                          <Button variant='outlined' onClick={() => handleSelection(item)}>
                            <LuPencil />
                          </Button>
                          <Button variant='outlined' onClick={() => handleDelete(item)}>
                            <FaRegTrashAlt />
                          </Button>
                        </Box>
                        <Button variant='contained' color='error' onClick={() => handleGeneratePdf(item.id)}>
                          <Typography variant="body2" sx={{fontSize:13}}>Generar PDF</Typography>
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            <Box
              sx={{
                width: '60%',
                backgroundColor: 'white',
                padding: 4,
                borderRadius: 2,
                boxShadow: 24,
              }}
            >
              <ModalInstrumento
                existingInstrumento={selectedInstrumento}
                onClose={handleClose}
                onSave={() => {
                  handleClose();
                }}
              />
            </Box>
          </Box>
        </Modal>
      </>
    </FadeInContent>
  );
};

export default Grilla;

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Box, Button, TextField, Typography } from '@mui/material';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import { getData } from '../../Api/genericCalls';

const Reportes: React.FC = () => {
  const initialFechaDesde = localStorage.getItem('fechaDesde') || new Date().getFullYear() + '-01-01';
  const initialFechaHasta = localStorage.getItem('fechaHasta') || new Date().getFullYear() + '-12-31';

  const [pedidosPorMes, setPedidosPorMes] = useState<any[]>([]);
  const [pedidosPorInstrumento, setPedidosPorInstrumento] = useState<any[]>([]);
  const [fechaDesde, setFechaDesde] = useState<string>(initialFechaDesde);
  const [fechaHasta, setFechaHasta] = useState<string>(initialFechaHasta);

  useEffect(() => {
    localStorage.setItem('fechaDesde', fechaDesde);
    localStorage.setItem('fechaHasta', fechaHasta);
    fetchPedidosPorMesYAnio();
    fetchPedidosPorInstrumento();
  }, [fechaDesde, fechaHasta]);

  const fetchPedidosPorMesYAnio = async () => {
    try {
      const data = await getData<any[]>(`http://localhost:8080/pedido/reportes/mes-anio?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
      setPedidosPorMes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPedidosPorInstrumento = async () => {
    try {
      const data = await getData<any[]>(`http://localhost:8080/pedido/reportes/instrumento?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
      setPedidosPorInstrumento(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const pedidosReporte = await getData<any[]>(`http://localhost:8080/pedido/reportes/detallado?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
      console.log("PedidosReporte", pedidosReporte);

      if (pedidosReporte.length === 0) {
        console.error("No se encontraron pedidos en el rango de fechas seleccionado.");
        return;
      }

      const reportData = pedidosReporte.map(pedido => ({
        'Fecha Pedido': pedido.fechaPedido,
        'Instrumento': pedido.instrumento,
        'Marca': pedido.marca,
        'Modelo': pedido.modelo,
        'Cantidad': pedido.cantidad,
        'Precio': pedido.precio,
        'Subtotal': pedido.subtotal
      }));

      const worksheet = XLSX.utils.json_to_sheet(reportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
      XLSX.writeFile(workbook, "ReportePedidos.xlsx");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '2%' }}>
        <TextField
          label="Fecha Desde"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
        />
        <TextField
          label="Fecha Hasta"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateReport}
          sx={{
            '&:hover': {
              backgroundColor: 'white',
              color: '#1976d2'
            }
          }}
          disabled={pedidosPorMes.length === 0 && pedidosPorInstrumento.length === 0}
        >
          Generar Reporte
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '3%' }}>
        <Box sx={{ width: '45%', height: '25rem', marginLeft:'4%' }}>
          <Typography variant="h5" component="h5" sx={{ marginLeft: '30%' }}>Pedidos por Mes y Año</Typography>
          {pedidosPorMes.length > 0 ? (
            <Bar
              data={{
                labels: pedidosPorMes.map(item => item.mesAnio),
                datasets: [{
                  label: 'Cantidad de Pedidos',
                  data: pedidosPorMes.map(item => item.cantidad),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }]
              }}
              options={chartOptions}
            />
          ) : (
            <p style={{ marginLeft: '12%' }}>No hay datos disponibles para el rango de fechas seleccionado.</p>
          )}
        </Box>

        <Box sx={{ width: '45%', height: '25rem', marginRight:'2%' }}>
          <Typography variant="h5" component="h5" sx={{ marginLeft: '28%' }}>Pedidos por Instrumento</Typography>
          {pedidosPorInstrumento.length > 0 ? (
            <Pie
              data={{
                labels: pedidosPorInstrumento.map(item => item.instrumento),
                datasets: [{
                  data: pedidosPorInstrumento.map(item => item.cantidad),
                  backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF5733',
                    '#33FF57',
                    '#3357FF'
                  ]
                }]
              }}              
              options={chartOptions}
            />
          ) : (
            <p style={{ marginLeft: '12%' }}>No hay datos disponibles para el rango de fechas seleccionado.</p>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Reportes;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../Screens/Home/Home';
import { DondeEstamos } from '../Screens/DondeEstamos/DondeEstamos';
import { Productos } from '../Screens/Productos/Productos';
import { DetalleInstrumento } from '../Screens/DetalleInstrumento/DetalleInstrumento';
import Navbar from '../Components/Navbar/Navbar';
import { Carrito } from '../Screens/Carrito/Carrito';

export const Rutas = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
        <Route path="/carrito" element={<Carrito/>}/>
      </Routes>
    </div>
  </Router>
);

export default Routes;

import { CarritoProvider } from "./Context/CarritoProvider";
import { Rutas } from "./Rutas/Rutas";

function App() {
  return (
    <CarritoProvider>
      <Rutas/>
    </CarritoProvider>    
  );
}

export default App;

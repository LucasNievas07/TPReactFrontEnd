import { AuthProvider } from "./Context/AuthContext";
import { CarritoProvider } from "./Context/CarritoProvider";
import Rutas from "./Rutas/Rutas";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
          <Rutas />
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
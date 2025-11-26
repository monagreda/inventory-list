import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryList from "./components/InventoryList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Sistema de gestion de inventario</h1>
        <Routes>
          {/* Ruta principal para listar productos */}
          <Route path="/" element={<InventoryList />} />

          {/* ruta de elemento nuevo */}
          <Route path="/new" element={<ProductForm />} />

          {/* Ruta para editar producto */}
          <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InventoryList from "./components/InventoryList";
import ProductForm from "./components/ProductForm";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationBar from "./components/NotificationBar";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="App">
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
      <NotificationBar />
    </NotificationProvider>
  )
}

export default App

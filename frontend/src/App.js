import "./App.css";
import Inicio from "./components/client/inicio";
import QuienesSomos from "./components/client/quienesSomos";
import Nav from "./components/client/nav";
import Contacto from "./components/client/contacto";
import Servicios from "./components/client/servicios";
import Login from "./components/admin/login";
import Footer from "./components/client/footer";
import Dashboard from "./components/admin/dashboard";
import AdminTable from "./components/admin/AdminTable";
import MiCuenta from "./components/admin/micuenta";
import Empleadotable from "./components/admin/empleadoTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function PublicLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

// Componente de Layout sin Nav (para login y dashboard)
function PrivateLayout({ children }) {
  return <div>{children}</div>;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*  Rutas cliente */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Inicio />
              </PublicLayout>
            }
          />
          <Route
            path="/quienes-somos"
            element={
              <PublicLayout>
                <QuienesSomos />
              </PublicLayout>
            }
          />
          <Route
            path="/contactanos"
            element={
              <PublicLayout>
                <Contacto />
              </PublicLayout>
            }
          />
          <Route
            path="/servicios"
            element={
              <PublicLayout>
                <Servicios />
              </PublicLayout>
            }
          />

          {/* Rutas Admin */}
          <Route
            path="admin/login"
            element={
              <PrivateLayout>
                <Login />
              </PrivateLayout>
            }
          />
          <Route
            path="admin/dashboard"
            element={
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            }
          />
          <Route
            path="admin/adminTable"
            element={
              <PrivateLayout>
                <AdminTable />
              </PrivateLayout>
            }
          />
          <Route
            path="admin/micuenta"
            element={
              <PrivateLayout>
                <MiCuenta />
              </PrivateLayout>
            }
          />
          <Route
            path="admin/empleadoTable"
            element={
              <PrivateLayout>
                <Empleadotable/>
              </PrivateLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

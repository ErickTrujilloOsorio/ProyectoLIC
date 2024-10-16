import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../css/dashboard.css";
import Empleados from "./empleado";
import Solicitudes from "./solicitud";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Bienvenido');
  const [tipoEmpleado, setTipoEmpleado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
    } else {
      const decodedToken = jwtDecode(token);
      setTipoEmpleado(decodedToken.tipo);
      fetch("http://localhost:5000/admin/check", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("No autorizado. Sesión expirada.");
            } else {
              throw new Error("Error en el servidor. Intenta más tarde.");
            }
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Error al autenticar");
          localStorage.removeItem("token");
          navigate("/admin/login");
        });
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar setSelectedOption={setSelectedOption} tipoEmpleado={tipoEmpleado} />
      <MainContent data={data} selectedOption={selectedOption} />
    </div>
  );
}

function Sidebar({ setSelectedOption, tipoEmpleado }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/img/logo.png" alt="Logo login Administrador" />
      </div>
      <nav className="sidebarDashboard">
        <ul>
          {tipoEmpleado === 1 && (
            <li onClick={() => setSelectedOption("Empleados")}>Empleados</li>
          )}
          <li onClick={() => setSelectedOption("Solicitud")}>Solicitudes</li>
          <li onClick={() => logout()}>Cerrar Sesión</li>
        </ul>
      </nav>
    </div>
  );
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/admin/login";
  sessionStorage.clear();
}

function MainContent({ data, selectedOption }) {
  return (
    <div className="main-content">
      <h1>{selectedOption === 'Bienvenido' ? `Bienvenido ${data ? data.nombre : "Cargando..."}` : selectedOption}</h1>
      <div className="graphics">
        {selectedOption === 'Empleados' && <EmpleadosContent />}
        {selectedOption === 'Solicitud' && <SolicitudesContent />}
      </div>
    </div>
  );
}

function EmpleadosContent() {
  return (
    <Empleados />
  );
}

function SolicitudesContent() {
  return (
    <Solicitudes />
  )
}


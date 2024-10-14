import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard.css"; // Archivo CSS global que incluye estilos del sidebar y el contenido
import Empleados from "./empleado";


//importaciones de las paginas 
import MiCuenta from "./micuenta";
export default function Dashboard() {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Bienvenido'); // Estado para la opción seleccionada
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
    } else {
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
      <Sidebar setSelectedOption={setSelectedOption} />
      <MainContent data={data} selectedOption={selectedOption} />
    </div>
  );
}

function Sidebar({ setSelectedOption }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/img/logo.png" alt="Logo login Administrador" />
      </div>
      <nav className="sidebarDashboard">
        <ul>
          <li onClick={() => setSelectedOption("Empleados")}>Empleados</li>
          <li onClick={() => setSelectedOption("Solicitudes")}>Solicitudes</li>
          <li onClick={() => setSelectedOption("Clientes")}>Clientes</li>
          <li onClick={() => setSelectedOption("Mi Cuenta")}>Mi Cuenta</li>
          <li onClick={() => handleLogout()}>Cerrar Sesión</li>
        </ul>
      </nav>
    </div>
  );
}

function handleLogout() {
  localStorage.removeItem("token");
  window.location.href = "/admin/login";
}

function MainContent({ data, selectedOption }) {
  return (
    <div className="main-content">
      <h1>{selectedOption === 'Bienvenido' ? `Bienvenido ${data ? data.nombre : "Cargando..."}` : selectedOption}</h1>
      <div className="graphics">
        {selectedOption === 'Empleados' && <EmpleadosContent />}
        {selectedOption === 'Solicitudes' && <SolicitudesContent />}
        {selectedOption === 'Clientes' && <ClientesContent />}
        {selectedOption === 'Mi Cuenta' && <MiCuentaContent />}
      </div>
    </div>
  );
}

function AdminContent() {
    return (
        <div>
        </div>
      );
    }

function EmpleadosContent() {
  return (
    <Empleados/>
  );
}

function SolicitudesContent() {
  return <div>Contenido de Solicitudes</div>;
}

function ClientesContent() {
  return <div>Contenido de Clientes</div>;
}

function MiCuentaContent() {
  return(
    <div>
        <MiCuenta/>
    </div>
  ); 

}

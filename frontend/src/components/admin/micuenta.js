import React, { useState, useEffect } from 'react';
import './css/micuenta.css'; // Importar los estilos de Mi Cuenta

export default function MiCuenta() {
  const [usuario, setUsuario] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Este efecto se ejecuta cuando el componente se monta para cargar los datos del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No autorizado. Por favor, inicie sesión.");
      return;
    }

    fetch("http://localhost:5000/api/usuario", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los datos del usuario");
        }
        return res.json();
      })
      .then((data) => {
        setUsuario(data.usuario);
        setNombres(data.nombres);
        setApellidos(data.apellidos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/usuario", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario,
        nombres,
        apellidos,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar los datos");
        }
        return res.json();
      })
      .then((data) => {
        alert("Datos actualizados correctamente");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mi-cuenta-container">
      <form className="mi-cuenta-form" onSubmit={handleSubmit}>
        <h2>Mi Cuenta</h2>

        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nombres:</label>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellidos:</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-editar">Editar</button>
      </form>
    </div>
  );
}

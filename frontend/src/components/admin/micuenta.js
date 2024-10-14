import React, { useState, useEffect } from 'react';
import '../../css/App.css'; // Importar el archivo CSS general

export default function MiCuenta() {
  const [usuario, setUsuario] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar la visibilidad del mensaje de éxito

  useEffect(() => {
    const token = localStorage.getItem("token");
    const empleadoId = localStorage.getItem("empleadoId");

    if (!token) {
      setError("No autorizado. Por favor, inicie sesión.");
      return;
    }

    fetch(`http://localhost:5000/admin/${empleadoId}`, {
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
        setUsuario(data.username);
        setNombres(data.nombre_empleado);
        setApellidos(data.apellido_empleado);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Mostrar el modal cuando se intente enviar el formulario
  };

  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    const empleadoId = localStorage.getItem("empleadoId");

    fetch(`http://localhost:5000/admin/${empleadoId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        nombre_empleado: nombres,
        apellido_empleado: apellidos,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar los datos");
        }
        return res.json();
      })
      .then((data) => {
        setShowModal(false); // Ocultar el modal después de confirmar
        setShowSuccessMessage(true); // Mostrar el mensaje de éxito
        setTimeout(() => setShowSuccessMessage(false), 3000); // Ocultar el mensaje después de 3 segundos
      })
      .catch((err) => {
        setError(err.message);
        setShowModal(false); // Ocultar el modal en caso de error
      });
  };

  const handleCancel = () => {
    setShowModal(false); // Ocultar el modal cuando se cancela
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-1">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6"> {/* Ajustar el tamaño de la columna para ser responsivo */}
          <div className="card">
            <div className="card-body">
              {showSuccessMessage && (
                <div className="alert alert-success" role="alert">
                  Datos actualizados correctamente
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="usuario">Usuario:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="nombres">Nombres:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="nombres"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="apellidos">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">Editar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center"> {/* Ajustado para centrar */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirmar Edición</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCancel}></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro de que deseas guardar los cambios?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirm}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
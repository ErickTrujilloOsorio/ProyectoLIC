import { useState } from "react";
import '../../css/App.css';

export default function Modal({ isVisible, closeModal, creditoId }) { 
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [salario, setSalario] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCloseModal = () => {
    setNombre('');
    setApellido('');
    setDireccion('');
    setDui('');
    setSalario('');
    setCorreo('');
    setTelefono('');
    setMensaje('');
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cliente = {
      nombre_cliente: nombre,
      apellido_cliente: apellido,
      direccion_cliente: direccion,
      dui: dui,
      salario: salario,
      correo_cliente: correo,
      telefono_cliente: telefono,
      documento1: 'no',
      documento2: 'no',
      documento3: 'no',
      estado_id: 1,
      credito_id: creditoId, // Agregar el id del crédito al cuerpo de la solicitud
    };

    try {
      const response = await fetch('http://localhost:5000/clientes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert('Solicitud enviada con éxito.');
        handleCloseModal();
      } else {
        const errorData = await response.json();
        alert(`Error al enviar la solicitud: ${errorData.message}`);
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog modal-lg"> {/* Tamaño grande del modal */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Formulario de Solicitud</h5>
            <button type="button" className="close border border-0 bg-white" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body mt-2">
            <form noValidate onSubmit={handleSubmit}>
              {/* Usar flexbox para los grupos de formularios */}
              <div className="d-flex flex-wrap mb-3">
                <div className="form-group flex-fill me-2">
                  <label htmlFor="nombre_cliente">Nombre:</label>
                  <input
                    type="text"
                    id="nombre_cliente"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} // Actualiza el estado
                    required
                  />
                </div>
                <div className="form-group flex-fill me-2">
                  <label htmlFor="apellido_cliente">Apellido:</label>
                  <input
                    type="text"
                    id="apellido_cliente"
                    className="form-control"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)} // Actualiza el estado
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap mb-3">
                <div className="form-group flex-fill me-2">
                  <label htmlFor="dui">DUI:</label>
                  <input
                    type="text"
                    id="dui"
                    className="form-control"
                    maxLength="10"
                    value={dui}
                    onChange={(e) => setDui(e.target.value)} // Actualiza el estado
                    required
                  />
                </div>
                <div className="form-group flex-fill me-2">
                  <label htmlFor="salario">Salario:</label>
                  <input
                    type="number"
                    id="salario"
                    className="form-control"
                    min={0}
                    step="0.01"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)} // Actualiza el estado
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="direccion_cliente">Dirección:</label>
                <textarea
                  id="direccion_cliente"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado
                  required
                />
              </div>
              <div className="d-flex flex-wrap mt-3 mb-3">
                <div className="form-group flex-fill me-2">
                  <label htmlFor="correo_cliente">Correo electrónico:</label>
                  <input
                    type="email"
                    id="correo_cliente"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado
                    required
                  />
                </div>
                <div className="form-group flex-fill me-2">
                  <label htmlFor="telefono_cliente">Teléfono:</label>
                  <input
                    type="tel"
                    id="telefono_cliente"
                    className="form-control"
                    maxLength="8"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Enviar Solicitud</button>
              </div>
            </form>
            {mensaje && <div id="mensajeFormulario">{mensaje}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

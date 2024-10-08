export default function Modal() {
      // Función para cerrar el modal
      function closeModal() {
        style.display = "none";
        applyForm.reset(); 
        mensaje.textContent = ''; 
    }

  return (
    <>
      {/* Modal para aplicación a servicios */}
      <div className="modal" id="modal" style={{ display: "none" }}>
        <div className="modal-content">
          <span className="close" id="closeModal" onClick={closeModal}>
            ×
          </span>
          <h2>Formulario de Solicitud</h2>
          <form id="applyForm" noValidate="">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo:</label>
              <input type="text" id="nombre" className="form-control" required="" />
            </div>
            <div className="form-group">
              <label htmlFor="dui">DUI:</label>
              <input type="text" id="dui" className="form-control" required="" />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo electrónico:</label>
              <input
                type="email"
                id="correo"
                className="form-control"
                required=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                className="form-control"
                required=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="salario">Salario:</label>
              <input
                type="number"
                id="salario"
                className="form-control"
                min={0}
                step="0.01"
                required=""
              />
            </div>
            <button type="button" id="submitForm" className="btn btn-success">
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </>

  );
};
import { useState, useEffect } from 'react';
import '../../css/App.css';

export default function ModalAsignacion({ isVisible, closeModal, solicitud }) {
    const [selectedEmpleadoId, setSelectedEmpleadoId] = useState(null);
    const [empleados, setEmpleados] = useState([]);

    const cargarEmpleados = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/empleados');
            const data = await response.json();
            setEmpleados(data);
        } catch (error) {
            console.error('Error al cargar empleados:', error);
        }
    };

    const asignarEmpleado = async () => {
        if (!selectedEmpleadoId) {
            alert('Por favor, selecciona un empleado.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/solicitud/asignar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idSolicitud: solicitud.idSolicitud,
                    empleado_id: selectedEmpleadoId,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al asignar el empleado');
            }

            const data = await response.json();
            console.log(data);
            closeModal(); 
        } catch (error) {
            console.error('Error al asignar el empleado:', error);
        }
    };

    useEffect(() => {
        cargarEmpleados();
    }, []);

    if (!isVisible) return null; 
    console.log(empleados)
    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <label htmlFor="empleadoSelect">Seleccionar Empleado:</label>
                    <div className="modal-header">
                        <h2>Asignar Empleado a Solicitud #{solicitud.idSolicitud}</h2>
                    </div>
                    <div className="modal-body mt-2">
                        <select className='form-select mb-4' id="empleadoSelect" onChange={(e) =>
                            setSelectedEmpleadoId(e.target.value)}>
                            <option value="">Seleccione un empleado</option>
                            {empleados.map((empleado) => (
                                <option key={empleado.idEmpleado} value={empleado.idEmpleado}>
                                    {empleado.nombre_empleado} {empleado.apellido_empleado}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn bg-success mx-3 text-light' onClick={asignarEmpleado}>Asignar</button>
                        <button type='button' className='btn bg-secondary text-light' onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

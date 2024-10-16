import { useState, useEffect } from 'react';
import '../../css/App.css';

export default function ModalAsignarEstado({ isVisible, closeModal, solicitud }) {
    const [selectedEstadoId, setSelectedEstadoId] = useState(null);
    const [estados, setEstados] = useState([]);

    const cargarEstados = async () => {
        try {
            const response = await fetch('http://localhost:5000/estado/get');
            const data = await response.json();
            setEstados(data);
        } catch (error) {
            console.error('Error al cargar Estados:', error);
        }
    };

    const asignarEstado = async () => {
        if (!selectedEstadoId) {
            alert('Por favor, selecciona un estado.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/solicitud/asignarEstado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idSolicitud: solicitud.idSolicitud,
                    estado_id: selectedEstadoId,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al asignar el estado');
            }

            const data = await response.json();
            console.log('Estado asignado:', data);
            closeModal();
        } catch (error) {
            console.error('Error al asignar el estado:', error);
        }
    };

    useEffect(() => {
        cargarEstados();
    }, []);

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Asignar Estado a Solicitud #{solicitud.idSolicitud}</h2>
                    </div>
                    <div className="modal-body mt-2">
                        <label htmlFor="estadoSelect">Seleccionar Estado:</label>
                        <select
                            className="form-select mb-4"
                            id="estadoSelect"
                            onChange={(e) => setSelectedEstadoId(e.target.value)}
                        >
                            <option value="">Seleccione un Estado</option>
                            {estados.map((estado) => (
                                <option key={estado.idEstado} value={estado.idEstado}>
                                    {estado.nombre_estado}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn bg-success mx-3 text-light"
                            onClick={asignarEstado}
                        >
                            Asignar
                        </button>
                        <button
                            type="button"
                            className="btn bg-secondary text-light"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

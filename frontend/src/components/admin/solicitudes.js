import React, { useState, useEffect } from 'react';
import ModalSolicitud from './modalSolicitud.js';
import '../../css/empleados.css';

export default function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('edit'); // 'edit', 'delete', o 'create'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:5000/solicitud/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las solicitudes');
                }
                return response.json();
            })
            .then(data => {
                setSolicitudes(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [token]);

    const openModal = (solicitud, mode) => {
        setSelectedSolicitud(solicitud);
        setModalMode(mode);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedSolicitud(null);
        setModalVisible(false);
    };

    const handleSaveChanges = (solicitud) => {
        const method = modalMode === 'create' ? 'POST' : 'PUT';
        const url = modalMode === 'create' ? 'http://localhost:5000/solicitud/add' : `http://localhost:5000/solicitud/${solicitud.idSolicitud}`;

        fetch(url, {
            method: method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(solicitud)
        })
            .then(response => response.json())
            .then(data => {
                setSuccessMessage('Solicitud guardada exitosamente');
                setSolicitudes(prevSolicitudes => {
                    if (modalMode === 'create') {
                        return [...prevSolicitudes, data];
                    } else {
                        return prevSolicitudes.map(s => s.idSolicitud === data.idSolicitud ? data : s);
                    }
                });
                closeModal();
            })
            .catch(error => {
                setError('Error al guardar la solicitud');
            });
    };

    const handleConfirmDelete = (solicitud) => {
        fetch(`http://localhost:5000/solicitud/${solicitud.idSolicitud}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(() => {
                setSolicitudes(prevSolicitudes => prevSolicitudes.filter(s => s.idSolicitud !== solicitud.idSolicitud));
                setSuccessMessage('Solicitud eliminada exitosamente');
                closeModal();
            })
            .catch(error => {
                setError('Error al eliminar la solicitud');
            });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const fields = [
        { name: 'cliente_id', label: 'Cliente ID', type: 'text', required: true },
        { name: 'empleado_id', label: 'Empleado ID', type: 'text', required: true },
        { name: 'credito_id', label: 'Crédito ID', type: 'text', required: true },
        { name: 'estado_id', label: 'Estado ID', type: 'text', required: true }
    ];

    return (
        <>
            <div className="table-container">
                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-create" onClick={() => openModal({}, 'create')}>Agregar Solicitud</button>
                </div>
                {successMessage && (
                    <div className="alert alert-success text-center" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className="table-responsive">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Empleado</th>
                                <th>Crédito</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map(solicitud => (
                                <tr key={solicitud.idSolicitud}>
                                    <td>{solicitud.cliente_id}</td>
                                    <td>{solicitud.empleado_id}</td>
                                    <td>{solicitud.credito_id}</td>
                                    <td>{solicitud.estado_id}</td>
                                    <td>
                                        <i className="bi bi-pencil-square action-icon edit me-2" title="Editar" onClick={() => openModal(solicitud, 'edit')}></i>
                                        <i className="bi bi-trash action-icon delete" title="Eliminar" onClick={() => openModal(solicitud, 'delete')}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalSolicitud
                isVisible={isModalVisible}
                closeModal={closeModal}
                data={selectedSolicitud}
                handleSaveChanges={handleSaveChanges}
                handleConfirmDelete={handleConfirmDelete}
                mode={modalMode}
                fields={fields}
                title="Solicitud"
            />
        </>
    );
}
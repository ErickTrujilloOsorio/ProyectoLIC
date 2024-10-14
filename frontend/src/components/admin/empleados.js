import React, { useState, useEffect } from 'react';
import Modal from './modalEmpleados.js';
import '../../css/App.css';
import '../../css/empleados.css';

export default function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('edit'); // 'edit', 'delete', o 'create'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setError("No autorizado. Por favor, inicie sesión.");
            setLoading(false);
            return;
        }

        fetch('http://localhost:5000/admin/list?tipoEmpleado=2', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener empleados");
                }
                return response.json();
            })
            .then(data => {
                setEmpleados(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [token]);

    const openModal = (empleado, mode) => {
        setSelectedEmpleado(empleado);
        setModalMode(mode);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedEmpleado(null);
        setModalVisible(false);
    };

    const handleSaveChanges = (empleado) => {
        const method = modalMode === 'create' ? 'POST' : 'PUT';
        const url = modalMode === 'create' ? 'http://localhost:5000/admin/add' : `http://localhost:5000/admin/${empleado.idEmpleado}`;

        // Estableciendo tipo_empleado_id para crear un nuevo empleado
        if (modalMode === 'create') {
            empleado.tipo_Empleado_id = 2;
        }

        // Convirtiendo estado a su valor numérico
        empleado.estado_id = empleado.estado === 'Activo' ? 1 : 2;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(empleado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al guardar cambios");
                }
                return response.json();
            })
            .then(data => {
                if (modalMode === 'create') {
                    setEmpleados([...empleados, data]);
                    setSuccessMessage("Empleado creado correctamente");
                } else {
                    setEmpleados(empleados.map(e => e.idEmpleado === data.idEmpleado ? data : e));
                    setSuccessMessage("Empleado modificado correctamente");
                }
                closeModal();
                setTimeout(() => setSuccessMessage(""), 3000); // Ocultando el mensaje después de 3 segundos
            })
            .catch(error => setError(error.message));
    };

    const handleConfirmDelete = (empleado) => {
        fetch(`http://localhost:5000/admin/${empleado.idEmpleado}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al eliminar empleado");
                }
                setEmpleados(empleados.filter(e => e.idEmpleado !== empleado.idEmpleado));
                setSuccessMessage("Empleado eliminado correctamente");
                closeModal();
                setTimeout(() => setSuccessMessage(""), 3000); // Ocultando el mensaje después de 3 segundos
            })
            .catch(error => setError(error.message));
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const fields = [
        { name: 'nombre_empleado', label: 'Nombre', type: 'text', required: true },
        { name: 'apellido_empleado', label: 'Apellido', type: 'text', required: true },
        { name: 'direccion_empleado', label: 'Dirección', type: 'text', required: true },
        { name: 'username', label: 'Usuario', type: 'text', required: true },
        { name: 'password', label: 'Contraseña', type: 'password', required: true },
        { name: 'correo_empleado', label: 'Correo', type: 'email', required: true },
        { name: 'telefono_empleado', label: 'Teléfono', type: 'text', required: true },
        { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], required: true }
    ];

    return (
        <>
            <div className="table-container">
                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-create" onClick={() => openModal({}, 'create')}>Agregar Empleado</button>
                </div>
                {successMessage && (
                    <div className="alert alert-success text-center" role="alert">
                        {successMessage}
                    </div>
                )}
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dirección</th>
                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="empleadoTableBody">
                        {empleados.map(empleado => (
                            <tr key={empleado.idEmpleado}>
                                <td>{empleado.nombre_empleado}</td>
                                <td>{empleado.apellido_empleado}</td>
                                <td>{empleado.direccion_empleado}</td>
                                <td>{empleado.username}</td>
                                <td>{empleado.correo_empleado}</td>
                                <td>{empleado.telefono_empleado}</td>
                                <td>{empleado.estado_id === 1 ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <i className="bi bi-pencil-square action-icon edit me-2" title="Editar" onClick={() => openModal(empleado, 'edit')}></i>
                                    <i className="bi bi-trash action-icon delete" title="Eliminar" onClick={() => openModal(empleado, 'delete')}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isVisible={isModalVisible}
                closeModal={closeModal}
                data={selectedEmpleado}
                handleSaveChanges={handleSaveChanges}
                handleConfirmDelete={handleConfirmDelete}
                mode={modalMode}
                fields={fields}
                title="Empleado"
            />
        </>
    );
}
import React, { useState, useEffect } from 'react';
import Modal from './modalEmpleados.js';
import '../../css/empleados.css'; // Importar el archivo CSS específico para Administradores

export default function Administradores() {
    const [administradores, setAdministradores] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
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

        fetch('http://localhost:5000/admin/list?tipoEmpleado=1', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener administradores");
                }
                return response.json();
            })
            .then(data => {
                setAdministradores(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [token]);

    const openModal = (admin, mode) => {
        setSelectedAdmin(admin);
        setModalMode(mode);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedAdmin(null);
        setModalVisible(false);
    };

    const handleSaveChanges = (admin) => {
        const method = modalMode === 'create' ? 'POST' : 'PUT';
        const url = modalMode === 'create' ? 'http://localhost:5000/admin/add' : `http://localhost:5000/admin/${admin.idEmpleado}`;

        // Estableciendo tipo_Empleado_id si se está creando un nuevo administrador
        if (modalMode === 'create') {
            admin.tipo_Empleado_id = 1;
        }

        // Convertiendo estado a su valor numérico
        admin.estado_id = admin.estado === 'Activo' ? 1 : 2;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(admin)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al guardar cambios");
                }
                return response.json();
            })
            .then(data => {
                if (modalMode === 'create') {
                    setAdministradores([...administradores, data]);
                    setSuccessMessage("Administrador creado correctamente");
                } else {
                    setAdministradores(administradores.map(a => a.idEmpleado === data.idEmpleado ? data : a));
                    setSuccessMessage("Administrador modificado correctamente");
                }
                closeModal();
                setTimeout(() => setSuccessMessage(""), 3000); // Ocultando el mensaje después de 3 segundos
            })
            .catch(error => setError(error.message));
    };

    const handleConfirmDelete = (admin) => {
        fetch(`http://localhost:5000/admin/${admin.idEmpleado}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al eliminar administrador");
                }
                setAdministradores(administradores.filter(a => a.idEmpleado !== admin.idEmpleado));
                setSuccessMessage("Administrador eliminado correctamente");
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
                    <button className="btn btn-create" onClick={() => openModal({}, 'create')}>Agregar Administrador</button>
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
                        <tbody id="adminTableBody">
                            {administradores.map(admin => (
                                <tr key={admin.idEmpleado}>
                                    <td>{admin.nombre_empleado}</td>
                                    <td>{admin.apellido_empleado}</td>
                                    <td>{admin.direccion_empleado}</td>
                                    <td>{admin.username}</td>
                                    <td>{admin.correo_empleado}</td>
                                    <td>{admin.telefono_empleado}</td>
                                    <td>{admin.estado_id === 1 ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        <i className="bi bi-pencil-square action-icon edit me-2" title="Editar" onClick={() => openModal(admin, 'edit')}></i>
                                        <i className="bi bi-trash action-icon delete" title="Eliminar" onClick={() => openModal(admin, 'delete')}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isVisible={isModalVisible}
                closeModal={closeModal}
                data={selectedAdmin}
                handleSaveChanges={handleSaveChanges}
                handleConfirmDelete={handleConfirmDelete}
                mode={modalMode}
                fields={fields}
                title="Administrador"
            />
        </>
    );
}
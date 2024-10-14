import React, { useState, useEffect, useCallback } from 'react';
import Modal from './modalClientes.js';
import '../../css/empleados.css';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('edit'); // 'edit', 'delete', o 'create'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const token = localStorage.getItem('token');

    const fetchClientes = useCallback(() => {
        setLoading(true);
        fetch('http://localhost:5000/clientes/get', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener clientes");
                }
                return response.json();
            })
            .then(data => {
                setClientes(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        if (!token) {
            setError("No autorizado. Por favor, inicie sesión.");
            setLoading(false);
            return;
        }

        fetchClientes();
    }, [token, fetchClientes]);

    const openModal = (cliente, mode) => {
        setSelectedCliente(cliente);
        setModalMode(mode);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedCliente(null);
        setModalVisible(false);
    };

    const handleSaveChanges = (cliente) => {
        const method = modalMode === 'create' ? 'POST' : 'PUT';
        const url = modalMode === 'create' ? 'http://localhost:5000/clientes/addCliente' : `http://localhost:5000/clientes/${cliente.idCliente}`;

        // Convertiendo estado a su valor numérico
        cliente.estado_id = cliente.estado === 'Activo' ? 1 : 2;

        // Estableciendo valores predeterminados para los documentos
        cliente.documento1 = cliente.documento1 || 'no';
        cliente.documento2 = cliente.documento2 || 'no';
        cliente.documento3 = cliente.documento3 || 'no';

        console.log('Datos del cliente:', cliente);

        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(cliente)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                setSuccessMessage(modalMode === 'create' ? "Cliente creado correctamente" : "Cliente modificado correctamente");
                closeModal();
                fetchClientes(); // Recargando los datos de los clientes
                setTimeout(() => setSuccessMessage(""), 3000); // Ocultando el mensaje después de 3 segundos
            })
            .catch(error => {
                throw error;
            });
    };

    const handleConfirmDelete = (cliente) => {
        fetch(`http://localhost:5000/clientes/${cliente.idCliente}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al eliminar cliente");
                }
                setSuccessMessage("Cliente eliminado correctamente");
                closeModal();
                fetchClientes(); // Recargando los datos de los clientes
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
        { name: 'nombre_cliente', label: 'Nombre', type: 'text', required: true },
        { name: 'apellido_cliente', label: 'Apellido', type: 'text', required: true },
        { name: 'direccion_cliente', label: 'Dirección', type: 'text', required: true },
        { name: 'dui', label: 'DUI', type: 'text', required: true },
        { name: 'salario', label: 'Salario', type: 'number', required: true },
        { name: 'correo_cliente', label: 'Correo', type: 'email', required: true },
        { name: 'telefono_cliente', label: 'Teléfono', type: 'text', required: true },
        { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], required: true }
    ];

    return (
        <>
            <div className="table-container">
                <div className="d-flex justify-content-center mb-3">
                    <button className="btn btn-create" onClick={() => openModal({}, 'create')}>Agregar Cliente</button>
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
                                <th>DUI</th>
                                <th>Salario</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clienteTableBody">
                            {clientes.map(cliente => (
                                <tr key={cliente.idCliente}>
                                    <td>{cliente.nombre_cliente}</td>
                                    <td>{cliente.apellido_cliente}</td>
                                    <td>{cliente.direccion_cliente}</td>
                                    <td>{cliente.dui}</td>
                                    <td>{cliente.salario}</td>
                                    <td>{cliente.correo_cliente}</td>
                                    <td>{cliente.telefono_cliente}</td>
                                    <td>{cliente.estado_id === 1 ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        <i className="bi bi-pencil-square action-icon edit me-2" title="Editar" onClick={() => openModal(cliente, 'edit')}></i>
                                        <i className="bi bi-trash action-icon delete" title="Eliminar" onClick={() => openModal(cliente, 'delete')}></i>
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
                data={selectedCliente}
                handleSaveChanges={handleSaveChanges}
                handleConfirmDelete={handleConfirmDelete}
                mode={modalMode}
                fields={fields}
                title="Cliente"
            />
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import "./css/admintable.css"; // Archivo CSS global que incluye estilos del sidebar y el contenido

export default function AdminTable() {
    const [admins, setAdmins] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ nombre: '', apellido: '', username: '' });

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/empleados')
            .then(response => response.json())
            .then(data => setAdmins(data))
            .catch(error => console.error('Error al cargar administradores:', error));
    }, []);

    const handleEdit = (id) => {
        console.log(`Editar administrador con ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Eliminar administrador con ID: ${id}`);
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        console.log('Agregar nuevo administrador:', newAdmin);
        // Aquí iría la lógica de agregar el nuevo administrador a través de una API
        setShowModal(false);
    };

    return (
        <div className="admin-table-container">
            <div className="admin-table-header">
                <h2>Lista de Administradores</h2>
                <button className="btn-add" onClick={() => setShowModal(true)}>
                    <FaPlus /> Agregar Administrador
                </button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td>{admin.nombre}</td>
                            <td>{admin.apellido}</td>
                            <td>{admin.username}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(admin.id)}>
                                    <FaEdit />
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(admin.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar administrador */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>Agregar Nuevo Administrador</h3>
                        <form onSubmit={handleAddAdmin}>
                            <label>Nombres:</label>
                            <input
                                type="text"
                                value={newAdmin.nombre}
                                onChange={(e) => setNewAdmin({ ...newAdmin, nombre: e.target.value })}
                                required
                            />
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                value={newAdmin.apellido}
                                onChange={(e) => setNewAdmin({ ...newAdmin, apellido: e.target.value })}
                                required
                            />
                            <label>Usuario:</label>
                            <input
                                type="text"
                                value={newAdmin.username}
                                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                                required
                            />
                            <button type="submit" className="btn-submit">Agregar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

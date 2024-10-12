import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import "./css/empleadotable.css"; // Archivo CSS global que incluye estilos del sidebar y el contenido

export default function Empleadotable() {
    const [empleados, setempleado] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newempleado, setNewEmpleado] = useState({ nombre: '', apellido: '', username: '' });

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/empleados')
            .then(response => response.json())
            .then(data => setempleado(data))
            .catch(error => console.error('Error al cargar empleados:', error));
    }, []);

    const handleEdit = (id) => {
        console.log(`Editar empleados con ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Eliminar empleados con ID: ${id}`);
    };

    const handleAddempleado = (e) => {
        e.preventDefault();
        console.log('Agregar nuevo empleado:', newempleado);
        // Aquí iría la lógica de agregar el nuevo empleado a través de una API
        setShowModal(false);
    };

    return (
        <div className="empleado-table-container">
            <div className="empleado-table-header">
                <h2>Lista de Empleados</h2>
                <button className="btn-add" onClick={() => setShowModal(true)}>
                    <FaPlus /> Agregar Empleados
                </button>
            </div>
            <table className="empleado-table">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(emple => (
                        <tr key={emple.id}>
                            <td>{emple.nombre}</td>
                            <td>{emple.apellido}</td>
                            <td>{emple.username}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(emple.id)}>
                                    <FaEdit />
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(emple.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar empleados */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>Agregar Nuevo Empleado</h3>
                        <form onSubmit={handleAddempleado}>
                            <label>Nombres:</label>
                            <input
                                type="text"
                                value={newempleado.nombre}
                                onChange={(e) => setNewEmpleado({ ...newempleado, nombre: e.target.value })}
                                required
                            />
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                value={newempleado.apellido}
                                onChange={(e) => setNewEmpleado({ ...newempleado, apellido: e.target.value })}
                                required
                            />
                            <label>Usuario:</label>
                            <input
                                type="text"
                                value={newempleado.username}
                                onChange={(e) => setNewEmpleado({ ...newempleado, username: e.target.value })}
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

import React, { useEffect, useState } from 'react';
import Modal from './modalEmpleado';

export default function GestionEmpleados() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);

    useEffect(() => {
        fetchEmpleados(); // Llama a la función al montar el componente
    }, []);

    const fetchEmpleados = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/empleados');
            const data = await response.json();
            setEmpleados(data);
        } catch (error) {
            console.error('Error al obtener empleados:', error);
        }
    };

    const openModalSave = () => {
        setSelectedEmpleado(null); 
        setModalVisible(true); };

    const openModalUpdate = (idEmpleado) => {
        const empleado = empleados.find(emp => emp.idEmpleado === idEmpleado);
        setSelectedEmpleado(empleado); 
        setModalVisible(true); 
    };

    const cargarEmpleados = async () => {
        const response = await fetch('http://localhost:5000/admin/empleados');
        const data = await response.json();
        setEmpleados(data);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedEmpleado(null);
        cargarEmpleados();
    };

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const eliminarEmpleado = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
        if (confirmacion) {
            try {
                const response = await fetch(`http://localhost:5000/admin/empleados/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setEmpleados(empleados.filter(emp => emp.idEmpleado !== id));
                }
            } catch (error) {
                console.error('Error al eliminar el empleado', error);
            }
        }
    };

    return (
        <div className="p-8">
            <button className="btn btn-success m-2" type='button' onClick={openModalSave}>
                Agregar Empleado
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Tipo de Empleado</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(empleado => (
                        <tr key={empleado.idEmpleado}>
                            <td>{empleado.idEmpleado}</td>
                            <td>{empleado.nombre_empleado}</td>
                            <td>{empleado.apellido_empleado}</td>
                            <td>{empleado.direccion_empleado}</td>
                            <td>{empleado.username}</td>
                            <td>{empleado.correo_empleado}</td>
                            <td>{empleado.telefono_empleado}</td>
                            <td>{empleado.tipo_Empleado_id === 1 ? 'Administrador' : 'Empleado'}</td>
                            <td>{empleado.estado_id === 1 ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button className="btn btn-secondary mx-2" type='button' onClick={() => openModalUpdate(empleado.idEmpleado)}>
                                    Cargar
                                </button>
                                <button className="btn btn-danger mx-2" onClick={() => eliminarEmpleado(empleado.idEmpleado)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isVisible={isModalVisible} closeModal={closeModal} empleado={selectedEmpleado} cargarEmpleados={cargarEmpleados}/>
        </div>
    );
}

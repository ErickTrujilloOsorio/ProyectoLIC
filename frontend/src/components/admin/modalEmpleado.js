import React, { useEffect, useState } from 'react';

export default function Modal({ isVisible, closeModal, empleado, cargarEmpleados }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState(1);
    const [tipoEmpleado, setTipoEmpleado] = useState(2);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (empleado) {
            setNombre(empleado.nombre_empleado);
            setApellido(empleado.apellido_empleado);
            setDireccion(empleado.direccion_empleado);
            setUsername(empleado.username);
            setCorreo(empleado.correo_empleado);
            setTelefono(empleado.telefono_empleado);
            setEstado(empleado.estado_id);
            setTipoEmpleado(empleado.tipo_Empleado_id);
            setIsUpdating(true);
        } else {
            // Reinicia el formulario si no hay empleado
            resetForm();
        }
    }, [empleado]);

    const resetForm = () => {
        setNombre('');
        setApellido('');
        setDireccion('');
        setUsername('');
        setPassword('');
        setCorreo('');
        setTelefono('');
        setEstado(1); 
        setTipoEmpleado(2); 
        setIsUpdating(false); 
    };

    const handleCloseModal = () => {
        resetForm();
        closeModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoEmpleado = {
            nombre_empleado: nombre,
            apellido_empleado: apellido,
            direccion_empleado: direccion,
            username,
            ...(isUpdating ? {} : { password }),
            correo_empleado: correo,
            telefono_empleado: telefono,
            tipo_Empleado_id: tipoEmpleado,
            estado_id: estado,
        };

        try {
            let response;

            if (isUpdating) {
                response = await fetch(`http://localhost:5000/admin/empleados/${empleado.idEmpleado}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoEmpleado),
                });
            } else {
                response = await fetch('http://localhost:5000/admin/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoEmpleado),
                });
            }

            if (response.ok) {
                alert(isUpdating ? 'Empleado actualizado con éxito' : 'Empleado registrado con éxito');
                resetForm();
                closeModal();
                cargarEmpleados();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        isVisible && (
            <div className="modalEmpleados">
                <div className="modalBody cardEmpleado">
                    <h3>{isUpdating ? 'Actualizar Empleado' : 'Registrar Empleado'}</h3>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6 my-2">
                                        <label>Nombre:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Apellido:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Dirección:</label>
                                        <textarea
                                            className="form-control"
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Usuario:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={isUpdating}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Correo:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Teléfono:</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Estado:</label>
                                        <select
                                            className="form-control"
                                            value={estado}
                                            onChange={(e) => setEstado(Number(e.target.value))}
                                        >
                                            <option value={1}>Activo</option>
                                            <option value={2}>Inactivo</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Tipo de Empleado:</label>
                                        <select
                                            className="form-control"
                                            value={tipoEmpleado}
                                            onChange={(e) => setTipoEmpleado(Number(e.target.value))}
                                        >
                                            <option value={1}>Administrador</option>
                                            <option value={2}>Empleado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary my-3" onSubmit={handleSubmit}>
                                {isUpdating ? 'Actualizar' : 'Registrar'}
                            </button>
                            <button type="button" className="btn btn-secondary mx-2" onClick={handleCloseModal}>
                                Cerrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

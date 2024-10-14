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
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (empleado) {
            // Si hay un empleado seleccionado, cargar sus datos en el formulario
            setNombre(empleado.nombre_empleado);
            setApellido(empleado.apellido_empleado);
            setDireccion(empleado.direccion_empleado);
            setUsername(empleado.username);
            setCorreo(empleado.correo_empleado);
            setTelefono(empleado.telefono_empleado);
            setEstado(empleado.estado_id); // Asegúrate de que este valor sea correcto
            setTipoEmpleado(empleado.tipo_Empleado_id); // Asegúrate de que este valor sea correcto
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
        setEstado(1); // Valor por defecto
        setTipoEmpleado(2); // Valor por defecto
        setIsUpdating(false); // Cambiar al modo registrar
        setMensaje('');
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
            ...(isUpdating ? {} : { password }), // Solo incluir la contraseña si es nuevo
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
                setMensaje(isUpdating ? 'Empleado actualizado con éxito' : 'Empleado registrado con éxito');
                setError('');
                resetForm();
                closeModal();
                cargarEmpleados();
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.message}`);
                setMensaje('');
            }
        } catch (error) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        isVisible && (
            <div className="modalEmpleados">
                <div className="modalBody card">
                    <h3>{isUpdating ? 'Actualizar Empleado' : 'Registrar Empleado'}</h3>
                    <div className="d-flex justify-content-between align-items-center">
                        {error && <p className="text-danger mt-2">{error}</p>}
                        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
                        <button type="button" className="close border border-0 bg-transparent" onClick={handleCloseModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
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

                            <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
                                {isUpdating ? 'Actualizar' : 'Registrar'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

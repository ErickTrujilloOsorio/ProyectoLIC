import React, { useEffect, useState } from 'react';

export default function GestionEmpleados() {
    const [empleados, setEmpleados] = useState([]);
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
    const [selectedEmpleadoId, setSelectedEmpleadoId] = useState(null);

    useEffect(() => {
        const cargarEmpleados = async () => {
            const response = await fetch('http://localhost:5000/admin/empleados');
            const data = await response.json();
            setEmpleados(data);
        };

        cargarEmpleados();
    }, []);

    const cargarEmpleado = (id) => {
        const empleado = empleados.find(emp => emp.idEmpleado === id);
        if (empleado) {
            setNombre(empleado.nombre_empleado);
            setApellido(empleado.apellido_empleado);
            setDireccion(empleado.direccion_empleado);
            setUsername(empleado.username);
            setCorreo(empleado.correo_empleado);
            setTelefono(empleado.telefono_empleado);
            setEstado(empleado.estado_id);
            setTipoEmpleado(empleado.tipo_Empleado_id);
            setSelectedEmpleadoId(empleado.idEmpleado);
            setIsUpdating(true);
        }
    };
    const resetForm = () => {
        setNombre('');
        setApellido('');
        setDireccion('');
        setUsername('');
        setPassword('');
        setCorreo('');
        setTelefono('');
        setEstado(1); // O el valor por defecto que prefieras
        setTipoEmpleado(2); // O el valor por defecto que prefieras
        setIsUpdating(false); // Esto es para volver al modo de registrar en vez de actualizar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const nuevoEmpleado = {
            nombre_empleado: nombre,
            apellido_empleado: apellido,
            direccion_empleado: direccion,
            username,
            // Solo incluir contraseña si se está registrando
            ...(isUpdating ? {} : { password }),
            correo_empleado: correo,
            telefono_empleado: telefono,
            tipo_Empleado_id: tipoEmpleado,
            estado_id: estado,
        };
    
        try {
            let response;
    
            if (isUpdating) {
                response = await fetch(`http://localhost:5000/admin/empleados/${selectedEmpleadoId}`, {
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
                resetForm(); // Limpiar el formulario
                // Recargar empleados
                const empleadosResponse = await fetch('http://localhost:5000/admin/empleados');
                const data = await empleadosResponse.json();
                setEmpleados(data);
            } else {
                const errorData = await response.json();
                setError(`Error: ${errorData.message}`);
                setMensaje('');
            }
        } catch (error) {
            setError('Error al conectar con el servidor');
        }
    };

    // Nueva función para eliminar empleado
    const eliminarEmpleado = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
        if (confirmacion) {
            try {
                const response = await fetch(`http://localhost:5000/admin/empleados/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setMensaje('Empleado eliminado con éxito');
                    setError('');
                    setEmpleados(empleados.filter(emp => emp.idEmpleado !== id)); // Filtrar el empleado eliminado
                } else {
                    setError('Error al eliminar el empleado');
                }
            } catch (error) {
                setError('Error al conectar con el servidor');
            }
        }
    };

    // Para cambiar entre el modo de agregar y actualizar empleados
    const handleAgregarEmpleado = () => {
        resetForm();
        setIsUpdating(false); // Cambiar al modo de registrar (no actualizar)
    };

    return (
        <div className="container mt-4">
            <h2 className="mt-5">Lista de Empleados</h2>
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
                                <button className="btn btn-secondary" onClick={() => cargarEmpleado(empleado.idEmpleado)}>
                                    Cargar
                                </button>
                                <button className="btn btn-danger ml-2" onClick={() => eliminarEmpleado(empleado.idEmpleado)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3>{isUpdating ? 'Actualizar Empleado' : 'Registrar Empleado'}</h3>
                    <button 
                        className="btn btn-success" 
                        onClick={handleAgregarEmpleado}
                    >
                        Agregar Empleado
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
                                        disabled={isUpdating} // Bloquear en modo de actualización
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
                                        onChange={(e) => setEstado(Number(e.target.value))}>
                                        <option value={1}>Activo</option>
                                        <option value={2}>Inactivo</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label>Tipo de Empleado:</label>
                                    <select 
                                        className="form-control" 
                                        value={tipoEmpleado} 
                                        onChange={(e) => setTipoEmpleado(Number(e.target.value))}>
                                        <option value={1}>Administrador</option>
                                        <option value={2}>Empleado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {isUpdating ? 'Actualizar' : 'Registrar'}
                        </button>
                        {error && <p className="text-danger mt-2">{error}</p>}
                        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
                    </form>      
                </div>    
            </div>
        </div>
        
    );
}
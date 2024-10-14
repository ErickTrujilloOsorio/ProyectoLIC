import { useState, useEffect } from 'react';

export default function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    const fetchSolicitudes = async () => {
        try {
            const response = await fetch('http://localhost:5000/solicitud/get');
            const data = await response.json();
            setSolicitudes(data);
        } catch (error) {
            console.error('Error fetching solicitudes:', error);
        }
    };

    return (
        <div className="solicitudes-container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Empleado Asignado</th>
                        <th>Crédito Solicitado</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.map(solicitud => (
                        <tr key={solicitud.idSolicitud}>
                            <td>{solicitud.idSolicitud}</td>
                            <td>{solicitud.cliente.nombre_cliente} {solicitud.cliente.apellido_cliente}</td>
                            <td>{solicitud.empleado ? `${solicitud.empleado.nombre_empleado} ${solicitud.empleado.apellido_empleado}` : 'No asignado'}</td>
                            <td>{solicitud.credito.nombre_cred}</td>
                            <td>{solicitud.estado.estado}</td>
                            <td>
                                <button className="btn btn-secondary mx-2" type='button'>
                                    Editar
                                </button>
                                <button className="btn btn-danger mx-2">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

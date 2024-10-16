import { useState, useEffect } from 'react';
import ModalAsignacion from './modalAsignacion';
import ModalDatosCliente from './modalDatosCliente';
import ModalAsignarEstado from './modalAsignarEstado';

export default function Solicitudes() {
    const [isModalClienteVisible, setModalClienteVisible] = useState(false);
    const [isModalAsignarVisible, setModalAsignarVisible] = useState(false);
    const [isModalAsignarEstadoVisible, setModalAsignarEstadoVisible] = useState(false); // Estado para el nuevo modal
    const [selectedCliente, setSelectedCliente] = useState([]);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [tipoEmpleado, setTipoEmpleado] = useState(null);

    useEffect(() => {
        const tipo = localStorage.getItem("tipo");
        setTipoEmpleado(tipo);
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = async () => {
        try {
            const response = await fetch('http://localhost:5000/solicitud/get');
            const solicitud = await response.json();
            setSolicitudes(solicitud);
        } catch (error) {
            console.error('Error fetching solicitudes:', error);
        }
    };

    const abrirModalCliente = async (idCliente) => {
        try {
            const response = await fetch(`http://localhost:5000/clientes/${idCliente}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos del cliente');
            }
            const clienteData = await response.json();
            setSelectedCliente(clienteData);
            setModalClienteVisible(true);
        } catch (error) {
            console.error('Error al abrir el modal del cliente:', error);
        }
    };

    const cerrarModalCliente = () => {
        setModalClienteVisible(false);
        setSelectedCliente(null);
    };

    const abrirModalAsignar = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setModalAsignarVisible(true);
    };

    const cerrarModalAsignar = () => {
        setModalAsignarVisible(false);
        setSelectedSolicitud(null);
        cargarSolicitudes();
    };

    const abrirModalAsignarEstado = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setModalAsignarEstadoVisible(true);
    };

    const cerrarModalAsignarEstado = () => {
        setModalAsignarEstadoVisible(false);
        setSelectedSolicitud(null);
        cargarSolicitudes();
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
                    {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
                        solicitudes.map(solicitud => (
                            <tr key={solicitud.idSolicitud}>
                                <td>{solicitud.idSolicitud}</td>
                                <td>{solicitud.nombre_cliente} {solicitud.apellido_cliente}</td>
                                <td>{solicitud.nombre_empleado ? `${solicitud.nombre_empleado} ${solicitud.apellido_empleado}` : 'No asignado'}</td>
                                <td>{solicitud.nombre_credito}</td>
                                <td>
                                    <button className="bg-transparent border border-0" type='button' onClick={() => abrirModalAsignarEstado(solicitud)}>
                                        {solicitud.nombre_estado}
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-secondary mx-2" type='button' onClick={() => abrirModalCliente(solicitud.idCliente)}>
                                        Cliente
                                    </button>
                                    {tipoEmpleado === "1" && (<button className="btn btn-secondary mx-2" type='button' onClick={() => abrirModalAsignar(solicitud)}>
                                        Asignar
                                    </button>)}

                                    <button className="btn btn-danger mx-2">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay solicitudes disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isModalClienteVisible && (
                <ModalDatosCliente isVisible={isModalClienteVisible} closeModal={cerrarModalCliente} cliente={selectedCliente} />
            )}
            {isModalAsignarVisible && (
                <ModalAsignacion
                    isVisible={isModalAsignarVisible}
                    closeModal={cerrarModalAsignar}
                    solicitud={selectedSolicitud}
                />)}
            {isModalAsignarEstadoVisible && (
                <ModalAsignarEstado
                    isVisible={isModalAsignarEstadoVisible}
                    closeModal={cerrarModalAsignarEstado}
                    solicitud={selectedSolicitud}
                />)}
        </div>
    );
}

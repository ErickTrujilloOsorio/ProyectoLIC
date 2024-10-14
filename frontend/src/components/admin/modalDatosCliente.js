import { useState, useEffect } from "react";
import '../../css/App.css';

export default function ModalDatosCliente({ isVisible, closeModal, cliente }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [salario, setSalario] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    console.log(cliente);
    useEffect(() => {
        if (cliente) {
            setNombre(cliente.nombre_cliente);
            setApellido(cliente.apellido_cliente);
            setDireccion(cliente.direccion_cliente);
            setCorreo(cliente.correo_cliente);
            setTelefono(cliente.telefono_cliente);
            setSalario(cliente.salario);
            setDui(cliente.dui);
        }
    }, [cliente]);

    return (
        isVisible && (
            <div className="modal-overlay">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cliente</h5>
                        </div>
                        <div className="modal-body mt-2">
                            <form noValidate>
                                {/* Usar flexbox para los grupos de formularios */}
                                <div className="d-flex flex-wrap mb-3">
                                    <div className="form-group flex-fill me-2">
                                        <label htmlFor="nombre_cliente">Nombre:</label>
                                        <input
                                            type="text"
                                            id="nombre_cliente"
                                            className="form-control"
                                            value={nombre}
                                            readOnly 
                                        />
                                    </div>
                                    <div className="form-group flex-fill me-2">
                                        <label htmlFor="apellido_cliente">Apellido:</label>
                                        <input
                                            type="text"
                                            id="apellido_cliente"
                                            className="form-control"
                                            value={apellido}
                                            readOnly 
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap mb-3">
                                    <div className="form-group flex-fill me-2">
                                        <label htmlFor="dui">DUI:</label>
                                        <input
                                            type="text"
                                            id="dui"
                                            className="form-control"
                                            value={dui}
                                            readOnly 
                                        />
                                    </div>
                                    <div className="form-group flex-fill me-2">
                                        <label htmlFor="salario">Salario:</label>
                                        <input
                                            type="number"
                                            id="salario"
                                            className="form-control"
                                            value={salario}
                                            readOnly 
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="direccion_cliente">Dirección:</label>
                                    <textarea
                                        id="direccion_cliente"
                                        className="form-control"
                                        value={direccion}
                                        readOnly 
                                    />
                                </div>
                                <div className="d-flex flex-wrap mt-3 mb-3">
                                    <div className="form-group flex-fill me-2">
                                        <label htmlFor="correo_cliente">Correo electrónico:</label>
                                        <input
                                            type="email"
                                            id="correo_cliente"
                                            className="form-control"
                                            value={correo}
                                            readOnly 
                                        />
                                    </div>
                                    <div className="form-group flex-fill me-2">
                                        <label htmlFor="telefono_cliente">Teléfono:</label>
                                        <input
                                            type="tel"
                                            id="telefono_cliente"
                                            className="form-control"
                                            value={telefono}
                                            readOnly 
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

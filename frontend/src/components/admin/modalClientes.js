import React, { useState, useEffect } from 'react';

export default function Modal({ isVisible, closeModal, data, handleSaveChanges, handleConfirmDelete, mode, fields, title }) {
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        apellido_cliente: '',
        direccion_cliente: '',
        dui: '',
        salario: '',
        correo_cliente: '',
        telefono_cliente: '',
        estado: 'Activo'
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (data) {
            setFormData({
                nombre_cliente: data.nombre_cliente || '',
                apellido_cliente: data.apellido_cliente || '',
                direccion_cliente: data.direccion_cliente || '',
                dui: data.dui || '',
                salario: data.salario || '',
                correo_cliente: data.correo_cliente || '',
                telefono_cliente: data.telefono_cliente || '',
                estado: data.estado_id === 2 ? 'Inactivo' : 'Activo'
            });
        }
    }, [data]);

    const handleCloseModal = () => {
        setFormData({
            nombre_cliente: '',
            apellido_cliente: '',
            direccion_cliente: '',
            dui: '',
            salario: '',
            correo_cliente: '',
            telefono_cliente: '',
            estado: 'Activo'
        });
        setErrorMessage('');
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = { ...data, ...formData };
        if (updatedData.estado === 'Activo') {
            updatedData.estado_id = 1;
        } else if (updatedData.estado === 'Inactivo') {
            updatedData.estado_id = 2;
        }
        handleSaveChanges(updatedData)
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {mode === 'edit' ? `Editar ${title}` : mode === 'create' ? `Crear ${title}` : `Confirmar Eliminación de ${title}`}
                        </h5>
                        <button type="button" className="close border border-0 bg-white" onClick={handleCloseModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mt-2">
                        {errorMessage && (
                            <div className="alert alert-danger text-center" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        {mode === 'edit' || mode === 'create' ? (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {fields.map(field => (
                                        <div className={`form-group mb-3 ${field.name === 'direccion_cliente' ? 'col-12' : 'col-md-6'}`} key={field.name}>
                                            <label htmlFor={field.name}>{field.label}:</label>
                                            {field.type === 'select' ? (
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    className="form-control"
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    required={field.required}
                                                >
                                                    {field.options.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    className="form-control"
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    required={field.required}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success btn-sm">{mode === 'create' ? 'Agregar' : 'Guardar'}</button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseModal}>Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <p>¿Estás seguro de que deseas eliminar {title} {data.nombre_cliente} {data.apellido_cliente}?</p>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleCloseModal}>Cancelar</button>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleConfirmDelete(data)}>Eliminar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
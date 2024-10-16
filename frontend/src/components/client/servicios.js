import { useState } from "react";
import Modal from "./modal";

export default function Servicios() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [credito_id, setIdCredito] = useState('');

    // Función para abrir el modal
    const openModal = (idCredito) => {
        setIdCredito(idCredito);
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {/* Menu Servicios */}
            <section id="servicios" className="container my-5">
                <h2 className="text-center">Servicios</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <img src="img/servi1.png" className="card-img-top" alt="Servicio 1" />
                            <div className="card-body">
                                <h5 className="card-title">Crédito Personal de Consumo</h5>
                                <p className="card-text">Este crédito está destinado a cubrir necesidades personales, como compras importantes, viajes o gastos imprevistos.</p>
                                <button className="btn btn-primary" id="applyService1" onClick={() => openModal(1)}>
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="img/servi2.png" className="card-img-top" alt="Servicio 2" />
                            <div className="card-body">
                                    <h5 className="card-title">Crédito para Pequeñas Empresas</h5>
                                    <p className="card-text">Este crédito está diseñado para apoyar a emprendedores o pequeñas empresas a financiar su crecimiento o capital de trabajo.</p>
                                <button className="btn btn-primary" id="applyService2" onClick={() => openModal(2)}>
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="img/servi3.png" className="card-img-top" alt="Servicio 3" />
                            <div className="card-body">
                                <h5 className="card-title">Ahorro a plazo fijo</h5>
                                <p className="card-text">Es una opción segura y predecible para quienes buscan rendimientos garantizados. Durante ese tiempo, el dinero no se puede retirar sin penalización</p>
                                <button className="btn btn-primary" id="applyService3" onClick={() => openModal(3)}>
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pasamos isVisible como prop */}
            <Modal isVisible={isModalVisible} closeModal={closeModal} creditoId={credito_id} />
        </>

    );
};
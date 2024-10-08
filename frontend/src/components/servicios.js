import Modal from "./modal";

export default function Servicios() {
    function openModal() {
        Modal.style.display = "block";
    }

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
                                <h5 className="card-title">Servicio 1</h5>
                                <p className="card-text">Descripción del servicio 1.</p>
                                <button className="btn btn-primary" id="applyService1" onClick={openModal}>
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="img/servi2.png" className="card-img-top" alt="Servicio 2" />
                            <div className="card-body">
                                <h5 className="card-title">Servicio 2</h5>
                                <p className="card-text">Descripción del servicio 2.</p>
                                <button className="btn btn-primary" id="applyService2">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="img/servi3.png" className="card-img-top" alt="Servicio 3" />
                            <div className="card-body">
                                <h5 className="card-title">Servicio 3</h5>
                                <p className="card-text">Descripción del servicio 3.</p>
                                <button className="btn btn-primary" id="applyService3">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};
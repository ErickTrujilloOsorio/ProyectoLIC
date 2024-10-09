export default function Nav() {
    return (
        <>
            {/* Seccion encabezado  */}
            <header className="bg-primary text-white p-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <a href="/" style={{ width: 80, height: "auto" }}>
                        <img
                            src="img/logo.png"
                            alt="logo cooperativa udb"
                            className="logo"
                        />
                    </a>
                    <h1 className="m-0 flex-grow-1 text-center h4" style={{ marginLeft: 10 }}>
                        SISTEMA WEB PARA COOPERATIVAS
                    </h1>
                    <div className="input-group" style={{ width: 200, marginLeft: 10 }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            aria-label="Buscar"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button">
                                <img
                                    src="img/lupa.png"
                                    alt="Buscar"
                                    style={{ width: 20, height: 20 }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Seccion menu */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-center"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Inicio
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quienes-somos">
                                ¿Quiénes somos?
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contactanos">
                                Contáctanos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/servicios">
                                Servicios
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>

    );
};
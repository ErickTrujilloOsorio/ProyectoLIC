export default function Nav() {
    return (
        <>
            {/* Sección encabezado  */}
            <header className="bg-success text-white p-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center"> {/* Alineamos verticalmente */}
                        <a href="/">
                            <img
                                src="img/logo.png"
                                alt="logo cooperativa udb"
                                className="logo"
                            />
                        </a>
                        <h5 className="ms-3 mb-0"> {/* Ajustamos el margen para centrar */}
                            SISTEMA WEB PARA COOPERATIVAS
                        </h5>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light">
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
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/" onMouseEnter={(e) => e.currentTarget.classList.add('bg-light', 'text-dark', 'rounded', 'text-primary')} onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light', 'text-dark', 'text-primary')}>
                                        Inicio
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/quienes-somos" onMouseEnter={(e) => e.currentTarget.classList.add('bg-light', 'text-dark', 'rounded', 'text-primary')} onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light', 'text-dark', 'text-primary')}>
                                        ¿Quiénes somos?
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/contactanos" onMouseEnter={(e) => e.currentTarget.classList.add('bg-light', 'text-dark', 'rounded', 'text-primary')} onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light', 'text-dark', 'text-primary')}>
                                        Contáctanos
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/servicios" onMouseEnter={(e) => e.currentTarget.classList.add('bg-light', 'text-dark', 'rounded', 'text-primary')} onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light', 'text-dark', 'text-primary')}>
                                        Servicios
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="/agencias" onMouseEnter={(e) => e.currentTarget.classList.add('bg-light', 'text-dark', 'rounded', 'text-primary')} onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light', 'text-dark', 'text-primary')}>
                                        Agencias
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

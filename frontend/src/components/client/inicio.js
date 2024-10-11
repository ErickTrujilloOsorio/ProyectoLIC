export default function Inicio() {
    return (
        <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="img/carru1.jpg" className="d-block w-100" alt="Imagen 1" />
                </div>
                <div className="carousel-item">
                    <img src="img/carru2.jpg" className="d-block w-100" alt="Imagen 2" />
                </div>
                <div className="carousel-item">
                    <img src="img/carru3.jpg" className="d-block w-100" alt="Imagen 3" />
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>

    );
};
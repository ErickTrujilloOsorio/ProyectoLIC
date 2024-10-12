export default function Agencias() {
    return (
        <section id="agencias" className="container my-5">
            <h2 className="text-center">Nuestras Agencias</h2>
            <div className="agencia">
                <div className="info-agencia">
                    <h3>Agencia Soyapango</h3>
                    <p>
                        <img src="/img/tel.png" alt="Teléfono" /> (+503) 2251-8241
                    </p>
                    <p>
                        <img src="/img/tel.png" alt="Correo" /> contacto@sistemascooperativas.com
                    </p>
                    <p>
                        <img src="/img/ubi.png" alt="Ubicación" /> Campus Soyapango, Calle a Plan
                        del Pino Km 1 1/2. Ciudadela Don Bosco, Soyapango, El Salvador, CA.
                    </p>
                </div>
                <div className="mapa-agencia">
                    <iframe
                        title="mapa1"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17361.43831722103!2d-89.1536987!3d13.7159035!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63375d2edcba6f%3A0x5101ecc11020bce6!2sUniversidad%20Don%20Bosco!5e1!3m2!1ses-419!2ssv!4v1728722926445!5m2!1ses-419!2ssv"
                        width="100%"
                        height={250}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
            <div className="agencia mt-4">
                <div className="info-agencia">
                    <h3>Agencia Antiguo Cuscatlán</h3>
                    <p>
                        <img src="/img/tel.png" alt="Teléfono" /> (+503) 2527-2307
                    </p>
                    <p>
                        <img src="/img/email.png" alt="Correo" />{" "}
                        contacto@sistemascooperativas.com
                    </p>
                    <p>
                        <img src="/img/ubi.png" alt="Ubicación" /> Final Av. Albert Einstein, No.
                        233, Colonia Jardines de Guadalupe, La Libertad, El Salvador.
                    </p>
                </div>
                <div className="mapa-agencia">
                    <iframe
                        title="mapa2"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17364.520929445167!2d-89.2370651!3d13.6741595!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6331d1e07bc94d%3A0x9aced3c8b794732d!2sUniversidad%20Don%20Bosco%20%7C%20Campus%20Antiguo%20Cuscatl%C3%A1n!5e1!3m2!1ses-419!2ssv!4v1728723029068!5m2!1ses-419!2ssv"
                        width="100%"
                        height={250}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    )
}
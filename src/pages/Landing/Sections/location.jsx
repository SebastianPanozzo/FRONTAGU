function Location() {
    return (
        <div id="location" style={{ backgroundColor: 'var(--white)', color: 'var(--burgundy)' }}>
            <div className="container py-3 d-flex flex-column align-items-center justify-content-center px-4 py-md-5 px-md-0" style={{ minHeight: "65dvh" }}>
                <div className="row text-center py-5">
                    <h2
                        style={{
                            fontFamily: 'Lato, sans-serif',
                            fontSize: '3.25rem',
                            fontWeight: "1000",
                            color: 'var(--burgundy)'
                        }}
                        className="mb-4"
                    >
                        Nuestra Ubicación
                    </h2>
                </div>
                <div className="row mt-lg-4 col-12 pb-md-5">
                    <div className="col-12 col-lg-6 d-flex flex-column align-items-center align-items-lg-start justify-content-between text-center text-lg-start">

                        {/* Dirección */}
                        <div className="mb-4 mb-lg-0">
                            <p className="fs-4 fw-bolder mb-0" style={{ color: 'var(--burgundy)' }}>
                                <i className="bi bi-geo-alt-fill"></i> Dirección
                            </p>
                            <p className="fw-medium mb-0">25 de Mayo 1484 - 1er piso, consultorio 8.</p>
                            <p className="fw-medium mb-0">Corrientes Capital</p>
                        </div>

                        {/* Horario de atención */}
                        <div className="mb-4 mb-lg-0">
                            <p className="fs-4 fw-bolder mb-0" style={{ color: 'var(--burgundy)' }}>
                                <i className="bi bi-clock-fill"></i> Horario de Atención
                            </p>
                            <p className="fw-medium mb-0">Horario comercial</p>
                            <p className="fw-medium mb-0">De lunes a viernes</p>
                            <p className="fw-medium mb-0">Por la mañana y por la tarde</p>
                            <p className="fw-medium mb-0">Turnos al <strong>3794-592217</strong></p>
                        </div>

                        {/* Turnos */}
                        <div className="mb-4 mb-lg-0">
                            <p className="fs-4 fw-bolder mb-0" style={{ color: 'var(--burgundy)' }}>
                                <i className="bi bi-calendar-check-fill"></i> Turnos
                            </p>
                            <p className="fw-medium mb-0">Se atiende siempre con turno previo</p>
                        </div>

                    </div>

                    {/* Mapa */}
                    <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center mt-4 mt-lg-0">
                        <iframe
                            title="Ubicación Consultorio"
                            src="https://www.google.com/maps/embed?pb=!4v1723741929486!6m8!1m7!1swFnJo3bi9AM2SxLAql6Luw!2m2!1d-27.4647397!2d-58.831668!3f188.31!4f0!5f0.7820865974627469"
                            width="100%"
                            height="300"
                            style={{ border: 0, borderRadius: '20px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;

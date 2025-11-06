import { useNavigate } from "react-router-dom"; 

function Card({ context }) {
    const navigateTo = useNavigate();
    const { item, button } = context;
    
    // Adaptamos para trabajar con la estructura de datos de ServicesList
    const { id, name, description, image, price } = item;

    const navegate = () => {
        const str = `/${button.path}/${id}`;
        navigateTo(str);
    };

    return (
        <div
            className="card shadow-sm rounded-4 w-100 h-100"
            style={{
                backgroundColor: "#15325c", // Fondo dark blue
                color: "#D0E4F7" // Texto glacier para toda la card
            }}
        >
            <div
                className="w-100 overflow-hidden"
                style={{ height: "300px" }}
            >
                <img
                    src={image}
                    className="rounded-bottom-0"
                    alt={`Imagen de ${name}`}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }}
                />
                <div style={{ display: 'none', color: 'red', padding: '10px', textAlign: 'center' }}>
                    Error al cargar la imagen
                </div>
            </div>

            <div className="card-body p-3" style={{ color: "#D0E4F7" }}>
                <h2 className="fw-bold mb-3">{name}</h2>
                <div className="mb-2">
                    <strong>Descripción: </strong>
                    <span style={{ color: "#D0E4F7" }}>{description}</span>
                </div>
                
                {price && (
                    <div className="mb-2">
                        <strong>Precio: </strong>
                        <span style={{ color: "#D0E4F7" }}>{price}</span>
                    </div>
                )}
            </div>

            {button && (
                <div className="p-3">
                    <button
                        type="submit"
                        className="form-control"
                        onClick={navegate}
                        style={{
                            backgroundColor: "#650015", // Fondo burgundy
                            color: "#D0E4F7", // Texto glacier
                            border: "none"
                        }}
                    >
                        {button.name}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Card;
import logoImg from '../../../../public/img/Logo.png';
import fpImg from '../../../../public/img/FP.png';

function Home() {
    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
            id="home"
            style={{
                backgroundColor: '#D0E4F7', // Fondo Glacier
                padding: '10% 20%', // padding vertical 20%, horizontal 5%
                boxSizing: 'border-box',
            }}
        >
            <div
                className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100"
                style={{
                    gap: '10% 5%', // separación entre imágenes
                }}
            >
                <img
                    src={logoImg}
                    alt="Logo"
                    style={{
                        maxWidth: '80%',
                        height: 'auto',
                        flex: '1 1 auto',
                    }}
                />
                <img
                    src={fpImg}
                    alt="FP"
                    style={{
                        maxWidth: '80%',
                        height: 'auto',
                        flex: '1 1 auto',
                    }}
                />
            </div>
        </div>
    );
}

export default Home;

import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const User = () => {
    const solicitudId = uuidv4(); // Genera un identificador único
    return (
        <>
            <Link to={`/aceptar/${solicitudId}`} className="btn btn-success">
                Enviar
            </Link>
        </>
    );
}

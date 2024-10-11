import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/admin/login'); 
        } else {
            fetch('http://localhost:5000/admin/check', {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                alert(res.ok)
                if (!res.ok) {
                    throw new Error('Token inválido o sesión expirada');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch((err) => {
                setError(err.message || 'Error al autenticar');
                localStorage.removeItem('token');
                navigate('/admin/login');
            });
        }
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
        <div className='loginBody'>
            <h1>Bienvenido {data ? `${data.nombre}` : 'Cargando...'}</h1>
        </div>
    );
}

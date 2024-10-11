import '../../styleLogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setUser] = useState('');
    const [pass, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || pass === '') {
            setError('Por favor, complete ambos campos.');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password: pass })
            });
            
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                navigate('/admin/dashboard');
            } else {
                const err = await res.json();
                setError(err.message || 'Error en credenciales');
            }
        } catch (e) {
            console.error(e);
            setError('Error en servidor');
        }
    };

    return (
        <>
            <div className='loginBody'>
                <div className="containerLogin">
                    <div className="logoLogin">
                        <h1>Sistema Web para Cooperativas</h1>
                        <img src="/img/logo.png" alt="Logo login Administrador " />
                    </div>
                    <div className="login-box">
                        <h2>Iniciar Sesión </h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Usuario:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Ingrese su usuario"
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <label htmlFor="pass">Contraseña:</label>
                            <input
                                type="password"
                                id="pass"
                                name="pass"
                                placeholder="Ingrese su contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Ingresar</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

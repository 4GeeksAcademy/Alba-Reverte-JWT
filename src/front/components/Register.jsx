import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";


export const Register = () => {

    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", user);

        try {
            const resp = await actions.register(user)
            console.log(resp);

            navigate("/login");

        } catch (error) {
            console.log("Error en el registro");
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div style={{ padding: "50px" }} className="w-50">
                <h2 className="mb-5 text-center">Formulario de Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            placeholder="Nombre"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required />
                    </div>
                    <div className="mb-3">

                        <input
                            className="form-control"
                            placeholder="Email"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required />
                    </div>
                    <div className="mb-3">

                        <input
                            className="form-control"
                            placeholder="Contraseña"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-outline-success w-50 mx-auto mt-3">
                            REGISTRARSE
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <p>¿Ya tienes cuenta? <Link to="/login" className="text-success">INGRESAR</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

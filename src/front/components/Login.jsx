import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";



export const Login = () => {


    const { store, actions } = useContext(Context);
    const { error } = store;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await actions.login(email, password)
            navigate("/");

        } catch (error) {
            console.log("Algo salió mal");
        }
    };


    return (


        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="row w-75">
                <div className="col-12 col-md-10 col-lg-6 mx-auto p-3">
                    <div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <h2 className="mb-5 text-center">Login</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 mt-4">
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />
                                </div>
                                <div className="mb-5">
                                    <input
                                        className="form-control"
                                        placeholder="Contraseña"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required />
                                    {error && (
                                        <div className="alert-sm text-danger text-center mt-3" role="alert">
                                            Usuario o contraseña incorrecto.
                                        </div>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-outline-success w-25 mx-auto mt-2">
                                        INGRESAR
                                    </button>
                                </div>
                                <div className="text-center mt-4">
                                    <p>¿No tienes cuenta? <Link to="/register" className="text-success">REGÍSTRATE</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
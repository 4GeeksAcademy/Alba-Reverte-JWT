import { Link } from "react-router-dom";

export const Home = () => {

	const handleLogout = () => {
		actions.logout();
	};

	return (

		<div className="d-flex flex-column justify-content-between vh-100">
			<div className="d-flex flex-grow-1 justify-content-center align-items-center">
				<p>¿No tienes cuenta? <Link to="/register" className="text-success">REGÍSTRATE</Link></p>
			</div>
			<form onSubmit={handleLogout} className="text-center mb-4">
				<button type="submit" className="btn btn-outline-success mb-5">
					CERRAR SESIÓN
				</button>
			</form>
		</div>


	)
}

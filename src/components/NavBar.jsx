import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../style/NavBar.css"

function NavBar() {
    const { logout } = useAuth("actions");
    const { isAuthenticated } = useAuth("state");


    const handleLogout = () => {
        logout();
    };

    return (
        <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="columns is-vcentered">
                        <Link className="navbar-item" to="/">
                            Home
                        </Link>
                        <Link className="navbar-item" to="/articles">
                            Cargar un artículo
                        </Link>
                        <Link className="navbar-item" to="/myarticle">
                            Mis Artículos
                        </Link>

                        {!isAuthenticated ? (
                            <Link className="navbar-item" to="/login">
                                Iniciar Sesión
                            </Link>
                        ) : (
                            <>
                                <Link className="navbar-item" to="profile">
                                    Mi Perfil
                                </Link>

                                <Link className="navbar-item" onClick={handleLogout}>
                                    Cerrar Sesión
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;

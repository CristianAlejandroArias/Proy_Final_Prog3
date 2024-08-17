import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
    const {logout} = useAuth("actions")
    const { isAuthenticaded } = useAuth("state")
    return (
        <header>
            <nav
                className={"navbar "}
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <div className="columns is-vcentered">
                        <Link className="navbar-item column" to="/">
                            Home
                        </Link>
                        <Link className="navbar-item column" to="/articles">
                            Cargar un articulo
                        </Link>
                        <Link className="navbar-item column" to="/my/article">
                            Mis Articulos
                        </Link>
                        <Link className="navbar-item column" to="/login">
                            Iniciar Sesión
                        </Link>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;

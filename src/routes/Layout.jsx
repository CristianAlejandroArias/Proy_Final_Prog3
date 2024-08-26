import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";


export default function Layout() {
    return (
        <AuthProvider>
            <div className="form-layout">
                <NavBar/>
                <Outlet />
            </div>
        </AuthProvider>
    );
}

import { Navigate, useNavigate } from "react-router";
import Button from "../../components/button/Button";
import { logout } from "../../util/mockLocalStorage";

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate("/login")
    }
    return (
        <div>
            <Button onClick={handleLogout}>Sair</Button>
        </div>
    )
}
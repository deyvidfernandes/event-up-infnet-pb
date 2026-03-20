import { Navigate, useNavigate } from "react-router";
import Button from "../../components/ui/Button/Button";
import { logout } from "../../lib/util/mockLocalStorage";

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
import { Outlet } from "react-router";
import { SideMenu } from "@/components/features/SideMenu/SideMenu"; // Ajuste o caminho conforme sua estrutura
import { MenuGroup } from "@/components/features/SideMenu/types";
import styles from "./LoggedLayout.module.css"
import { logout } from "@/lib/util/mockLocalStorage";


const menuGroups: MenuGroup[] = [
    {
        title: "Eventos",
        links: [
            { icon: "fa-chart-simple", label: "Painel", path: "/u/home" },
            { icon: "fa-plus-circle", label: "Novo", path: "/u/novo-evento" },
        ],
        allowed: "organizador"
    },
    {
        title: "Administração",
        links: [
            { icon: "fa-envelope", label: "Mensagens", path: "#", disabled: true },
        ],
        allowed: "organizador"
    },
    {
        title: "Eventos",
        links: [
            { icon: "fa-magnifying-glass", label: "Explorar", path: "/u/home" },
            { icon: "fa-ticket", label: "Inscrições", path: "/u/inscricoes" },
        ],
        allowed: "participante"
    },
    {
        title: "Conta",
        links: [
            { icon: "fa-id-card", label: "Dados", path: "#", disabled: true },
            { icon: "fa-sliders", label: "Preferências", path: "#", disabled: true },
            { icon: "fa-right-from-bracket", label: "Sair", path: (navigate) => {logout();navigate("/login")} },
        ],
        allowed: "all"
    }
];

export default function LoggedLayout() {
    return (
        <div>
            <SideMenu menuGroups={menuGroups}/>
            <main className={styles.layoutContentContainer}>
                <Outlet />
            </main>
        </div>
    );
}
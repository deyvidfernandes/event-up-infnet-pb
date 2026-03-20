import { Outlet } from "react-router";
import { SideMenu } from "@/components/features/SideMenu/SideMenu"; // Ajuste o caminho conforme sua estrutura
import { MenuGroup } from "@/components/features/SideMenu/types";

const menuGroups: MenuGroup[] = [
    {
        title: "Eventos",
        links: [
            { icon: "fa-chart-simple", label: "Painel", path: "#" },
            { icon: "fa-plus-circle", label: "Novo", path: "#" },
            { icon: "fa-list-check", label: "Gerenciar", path: "#" }, 
        ],
        allowed: "organizador"
    },
    {
        title: "Administração",
        links: [
            { icon: "fa-envelope", label: "Mensagens", path: "#" },
        ],
        allowed: "organizador"
    },
    {
        title: "Conta",
        links: [
            { icon: "fa-id-card", label: "Dados", path: "#" },
            { icon: "fa-sliders", label: "Preferências", path: "#" },
            { icon: "fa-right-from-bracket", label: "Sair", path: "#" },
        ],
        allowed: "organizador"
    }
];

export default function HubLayout() {
    return (
        <div>
            <SideMenu menuGroups={menuGroups}/>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
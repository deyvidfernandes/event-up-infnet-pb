import { Outlet } from "react-router";
import { SideMenu } from "@/components/features/SideMenu/SideMenu"; // Ajuste o caminho conforme sua estrutura

export default function HubLayout() {
    return (
        <div>
            <SideMenu />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
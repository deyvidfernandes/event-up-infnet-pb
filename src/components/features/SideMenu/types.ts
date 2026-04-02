import { AccountTypes } from "@/types/user";

interface MenuLink {
    icon: string;
    label: string;
    path: string | ((navigate: (to: string) => void) => void);
    disabled?: boolean
}

export interface MenuGroup {
    title: string;
    links: MenuLink[];
    allowed: AccountTypes | "all";
}
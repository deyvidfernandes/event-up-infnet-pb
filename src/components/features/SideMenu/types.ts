import { AccountTypes } from "@/types/user";

interface MenuLink {
    icon: string;
    label: string;
    path: string;
}

export interface MenuGroup {
    title: string;
    links: MenuLink[];
    allowed: AccountTypes
}
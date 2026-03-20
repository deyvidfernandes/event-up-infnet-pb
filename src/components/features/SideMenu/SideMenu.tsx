import { useState, useRef, useEffect } from 'react';
import useClickOutside from "@/hooks/useClickOutside";
import styles from "./SideMenu.module.css";
import { MenuGroup } from './types';

type SideMenuProps = {
    menuGroups: MenuGroup[]
}

export function SideMenu({menuGroups}: SideMenuProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sidebarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onMouseEnter = () => {
        if (!isDesktop) return;
        timeoutRef.current = setTimeout(() => setIsExpanded(true), 500);
    };

    const onMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const toggleMenu = () => setIsExpanded(!isExpanded);

    useClickOutside(sidebarRef, () => setIsExpanded(false), isExpanded);

    return (
        <>
            {/* Botão Hambúrguer visível apenas no Mobile */}
            <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </button>

            <aside 
                className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={sidebarRef}
            >
                { !isDesktop && (
                    <button className={styles.closeMenuBtn} onClick={() => setIsExpanded(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
                
                <div className={styles.sidebarHeaders}>
                    <img src="/logo.svg" alt="logo" style={{ maxWidth: "64px" }} />
                    <h2 className={styles.title}>EventUp</h2>
                </div>

                <ul className={styles.sidebarLinks}>
                    {menuGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h4>
                                <span>{group.title}</span>
                                <div className={styles.menuSeparator}></div>
                            </h4>
                            {group.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a href={link.path}>
                                        <div className={styles.iconContainer}>
                                            <i className={`fa-solid ${link.icon}`}></i>
                                        </div>
                                        <span className={styles.linkText}>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
            </aside>
        </>
    );
}
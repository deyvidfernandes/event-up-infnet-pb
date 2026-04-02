import { useState, useRef, useEffect } from 'react';
import useClickOutside from "@/hooks/useClickOutside";
import styles from "./SideMenu.module.css";
import { MenuGroup } from './types';
import { getLoggedUser } from '@/lib/util/mockLocalStorage';
import {Link, useNavigate} from 'react-router';

type SideMenuProps = {
    menuGroups: MenuGroup[]
}

export function SideMenu({menuGroups}: SideMenuProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sidebarRef = useRef<HTMLElement>(null);
    const accessType = getLoggedUser()!.accountType
    const navigate = useNavigate()
    // UX

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


    // ACESSOS

    const filteredMenuGroups = menuGroups.filter(mg => ((mg.allowed === accessType) || (mg.allowed === "all")))

    // RENDERIZAÇÃO

    return (
        <>
            {/* Botão burguer no Mobile */}
            { !isDesktop && (
                    <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                )
            }
            

            <nav 
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
                    {filteredMenuGroups .map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h4>
                                <span>{group.title}</span>
                                <div className={styles.menuSeparator}></div>
                            </h4>
                            {group.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    
                                    <Link 
                                    key={link.label} 
                                    onClick={(e) => {
                                        if (link.disabled) {
                                        e.preventDefault();
                                        return;
                                        }

                                        const isFunction = typeof link.path === "function";
                                        if (isFunction) {
                                        e.preventDefault();
                                        (link.path as Function)(navigate);
                                        } else {
                                        setIsExpanded(false);
                                        }
                                    }} 
                                    to={link.disabled ? "#" : (typeof link.path === "function" ? "#" : link.path)}
                                    className={`${styles.link} ${link.disabled ? styles.disabled : ""}`}
                                    >
                                    <div className={styles.iconContainer}>
                                        <i className={`fa-solid ${link.icon}`}></i>
                                    </div>
                                    <span className={styles.linkText}>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
            </nav>
        </>
    );
}
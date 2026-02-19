import { AnchorHTMLAttributes, MouseEvent } from "react";
import { replace, useNavigate } from "react-router"; // ou "react-router-dom"
import styles from "./link.module.css";

export default function Link({ children, href, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // 1. executa onClick passado via props primeiro
    if (onClick) onClick(event);
    // 2. Navega para a nova página
    event.preventDefault();
    if (href) {
      navigate(href);
    }
  }

  return (
    <a 
      className={styles.link} 
      href={href} 
      onClick={handleClick} 
      {...props}
    >
      {children}
    </a>
  )
}
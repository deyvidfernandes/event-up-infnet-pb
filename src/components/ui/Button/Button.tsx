import styles from "./button.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, type = "button", disabled = false, ...props}: ButtonProps) {
  return (
    <button 
      type={type} 
      disabled={disabled}
      className={styles.customButton} 
      {...props}
    >
      {children}
    </button>
  );
}
import styles from "./button.module.css";

export default function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button 
      type={type} 
      className={styles.customButton} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
import styles from "./button.module.css";

export default function Button({ children, type = "button", disabled = false, ...props}) {
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
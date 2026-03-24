import styles from "./formField.module.css";
import { InputHTMLAttributes } from "react";

export const masks = {
  cep: (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  },
  tel: (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  },
};

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maskType?: "cep" | "tel";
  label?: string;
}

export default function FormInputField({
  errorMessage,
  maskType,
  label,
  onChange,
  ...rest
}: ComponentProps) {
  
  // Função que intercepta a digitação e aplica a máscara antes de salvar no form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maskType && masks[maskType]) {
      event.target.value = masks[maskType](event.target.value);
    }
    
    // Dispara o onChange original do react-hook-form
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={styles.formInput}>
      {label && <label>{label}</label>}
      
      <input 
        {...rest} 
        onChange={handleChange} 
        className={errorMessage ? styles.inputError : ""}
      />
      
      {errorMessage && (
        <p className={styles.errorLabel}>{errorMessage}</p>
      )}
    </div>
  );
}
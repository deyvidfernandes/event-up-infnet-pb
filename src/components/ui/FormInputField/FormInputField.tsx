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

interface RadioOption {
  label: string;
  value: string;
}

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maskType?: "cep" | "tel";
  label?: string;
  options?: RadioOption[];
}

export default function FormInputField({
  errorMessage,
  maskType,
  label,
  onChange,
  options,
  type,
  ...rest
}: ComponentProps) {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maskType && masks[maskType]) {
      event.target.value = masks[maskType](event.target.value);
    }
    
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={styles.formInput}>
      {label && <label className={styles.mainLabel}>{label}</label>}
      
      {type === "radio" && options ? (
        <div className={styles.radioGroup}>
          {options.map((option) => (
            <label key={option.value} className={styles.radioLabel}>
              <input 
                {...rest}
                type="radio"
                value={option.value}
                checked={rest.value === option.value}
                onChange={handleChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <input 
          {...rest}
          type={type}
          onChange={handleChange} 
          className={errorMessage ? styles.inputError : ""}
        />
      )}
      
      {errorMessage && (
        <p className={styles.errorLabel}>{errorMessage}</p>
      )}
    </div>
  );
}
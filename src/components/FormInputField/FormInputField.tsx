import styles from "./formField.module.css";
import { InputHTMLAttributes, ReactNode } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

interface ComponentProps extends Omit<PatternFormatProps, 'format'> {
  errorMessage?: ReactNode;
  mask?: string; // Ex: "(##) #####-####";
}

export default function FormInputField({
  errorMessage,
  mask,
  ...props
}: ComponentProps) {
  return (
    <div className={styles.formInput}>
      {mask ? (
        <PatternFormat
          {...props}
          format={mask}
          mask="_"
          customInput="input" // Diz para usar um input comum
        />
      ) : (
        <input {...props} />
      )}
      
      {errorMessage && (
        <p className={styles.errorLabel}>{errorMessage}</p>
      )}
    </div>
  );
}
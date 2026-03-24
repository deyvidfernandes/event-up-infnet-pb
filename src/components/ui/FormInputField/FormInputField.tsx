import styles from "./formField.module.css";
import { InputHTMLAttributes } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

interface ComponentProps extends Omit<PatternFormatProps, "format"> {
  errorMessage?: string;
  mask?: string;
}

export default function FormInputField({
  errorMessage,
  mask,
  ...rest
}: ComponentProps) 

{
  return (
    <div className={styles.formInput}>
      {mask ? (
        <PatternFormat
          {...rest}
          format={mask}
          mask="_"
          customInput={(props) => <input {...props} />} // ComponentType<InputAttributes> exige algo redenrizável
        />
      ) : (
        <input {...rest as InputHTMLAttributes<HTMLInputElement>} />
      )}
      
      {errorMessage && (
        <p className={styles.errorLabel}>{errorMessage}</p>
      )}
    </div>
  );
}
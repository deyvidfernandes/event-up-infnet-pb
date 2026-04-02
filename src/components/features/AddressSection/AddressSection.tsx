import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInputField from '@/components/ui/FormInputField/FormInputField';

import styles from './AdressSection.module.css';


import * as yup from "yup";

export const addressSchema = {
  logradouro: 
    yup.string().
    required("Logradouro obrigatório"),
  bairro: 
    yup.string().
    required("Bairro obrigatório"),
  cidade: 
    yup.string()
    .required("Cidade obrigatória"),
  uf: 
    yup.string().
    required("UF obrigatória").
    max(2),
};

export const adressDefaultValues = {
  logradouro: "",
  bairro: "",
  cidade: "",
  uf: ""
}


export function AddressSection() {
  const { control, setValue, formState: { errors } } = useFormContext();
  const [cepToFetch, setCepToFetch] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cepToFetch?.replace(/\D/g, "");
      if (!cleanCep || cleanCep.length !== 8) return;

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setValue("logradouro", data.logradouro, { shouldValidate: true });
          setValue("bairro", data.bairro, { shouldValidate: true });
          setValue("cidade", data.localidade, { shouldValidate: true });
          setValue("uf", data.uf, { shouldValidate: true });
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (err) {
        toast.error("Erro ao buscar o CEP.");
      }
    };

    fetchAddress();
  }, [cepToFetch, setValue]);

  return (
    <div className={styles.container}>
      {/*controler para poder manipular o valor de CEP no método register */}
      <Controller
        name="cep"
        control={control}
        render={({ field: { onBlur, value, ...rest } }) => (
          <FormInputField
            label="CEP"
            maskType="cep"
            value={value}
            errorMessage={errors.cep?.message as string}
            onBlur={(e) => {
              onBlur();
              setCepToFetch(e.target.value);
            }}
            {...rest}
          />
        )}
      />

      <div className={styles.fullWidth}>
        <FormInputField 
          label="Logradouro" 
          {...control.register("logradouro")} 
          errorMessage={errors.logradouro?.message as string}
        />
      </div>
      
      <FormInputField 
        label="Bairro" 
        {...control.register("bairro")} 
        errorMessage={errors.bairro?.message as string}
      />

      <div className={styles.inlineGroup}>
        <FormInputField 
          label="Cidade" 
          {...control.register("cidade")} 
          errorMessage={errors.cidade?.message as string}
        />
        <FormInputField 
          label="UF" 
          {...control.register("uf")} 
          errorMessage={errors.uf?.message as string}
        />
      </div>
    </div>
  );
}
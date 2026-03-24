import FormInputField from '@/components/ui/FormInputField/FormInputField';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

export function AddressSection() {
  const { control, setValue, formState: { errors }, watch } = useFormContext();
  const [cepToFetch, setCepToFetch] = useState("");

  const currentCep = watch("cep");

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = cepToFetch.replace(/\D/g, "");
      if (cleanCep.length !== 8) return;

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          // Preenche os campos automaticamente
          setValue("logradouro", data.logradouro);
          setValue("bairro", data.bairro);
          setValue("cidade", data.localidade);
          setValue("uf", data.uf);
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    };

    if (cepToFetch) fetchAddress();
  }, [cepToFetch, setValue]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <Controller
        name="cep"
        control={control}
        render={({ field: { onBlur, value, ...rest } }) => (
          <FormInputField
            label="CEP"
            maskType="cep"
            value={value}
            errorMessage={errors.cep?.message as string}
            onBlur={() => {
              onBlur();
              setCepToFetch(value);
            }}
            {...rest}
          />
        )}
      />

      <FormInputField 
        label="Logradouro" 
        {...control.register("logradouro")} 
        errorMessage={errors.logradouro?.message as string}
      />
      
      <FormInputField 
        label="Bairro" 
        {...control.register("bairro")} 
        errorMessage={errors.bairro?.message as string}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <FormInputField label="Cidade" {...control.register("cidade")} />
        <FormInputField label="UF" {...control.register("uf")} />
      </div>
    </div>
  );
}
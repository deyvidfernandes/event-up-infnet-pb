import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import Button from "../../ui/Button/Button";
import FormInputField from "../../ui/FormInputField/FormInputField";
import { useEffect, useState } from "react";
import { AddressSection } from "../AddressSection/AddressSection";

const cepRegExp = /^\d{5}-?\d{3}$/

const schema = yup.object({
  nome: yup
    .string()
    .required(),
  eventDate: yup
    .date()
    .required(),
  cep: yup
    .string()
    .matches(cepRegExp, 'CEP inválido. Use o formato 99999-999')
    .required(),
  price: yup
    .number()
    .min(0)
    .required(),
  eventCapacity: yup
    .number()
    .min(0)
    .required(),
});

const eventDefaultDate = new Date();
eventDefaultDate.setDate(eventDefaultDate.getDate() + 90);

export default function NewEventForm() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      eventCapacity: 10,
      price: 0,
      cep: "",
      nome: "",
      eventDate: eventDefaultDate
    }
  });

  const onSubmit = (data: any) => {
    console.log("Dados formatados:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', marginInline: 'auto'}}>
        
        <FormInputField 
          label="Nome do Evento"
          placeholder="Ex: Workshop de React"
          errorMessage={methods.formState?.errors.nome?.message}
          {...methods.register("nome")}
        />

        <FormInputField 
          label="Data"
          type="date"
          errorMessage={methods.formState?.errors.eventDate?.message}
          {...methods.register("eventDate", { valueAsDate: true })}
        />

        <AddressSection />

        <div style={{ display: 'flex', gap: '10px' }}>
          <FormInputField 
            label="Preço (R$)"
            type="number"
            step="0.01"
            errorMessage={methods.formState?.errors.price?.message}
            {...methods.register("price", { valueAsNumber: true })}
          />

          <FormInputField 
            label="Vagas"
            type="number"
            errorMessage={methods.formState?.errors.eventCapacity?.message}
            {...methods.register("eventCapacity", { valueAsNumber: true })}
          />
        </div>

        <Button type="submit">Criar Evento</Button>
      </form>
    </FormProvider>
  );
}
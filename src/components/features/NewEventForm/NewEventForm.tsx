import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "react-toastify";

import Button from "../../ui/Button/Button";
import FormInputField from "../../ui/FormInputField/FormInputField";
import {
  AddressSection,
  addressSchema,
  adressDefaultValues,
} from "../AddressSection/AddressSection";
const cepRegExp = /^\d{5}-?\d{3}$/;

const schema = yup.object({
  nome: yup.string().required("O nome do evento é obrigatório"),
  eventDate: yup
    .date()
    .required("A data do evento é obrigatória")
    .typeError("Use apenas datas dd/mm/aaaa nesse campo"),
  cep: yup
    .string()
    .required("O CEP do endereço é obrigatório")
    .matches(cepRegExp, "CEP inválido. Use o formato 99999-999"),
  price: yup
    .number()
    .required("O preço da entrada é obrigatório")
    .min(0, "O preço da entrada não pode ser negativo"),
  eventCapacity: yup
    .number()
    .required("A capaciade é obrigatória")
    .min(2, "A capacidade do evento precisa ser maior que um"),
  ...addressSchema,
});

export interface EventFormData {
  nome: string;
  eventDate: Date;
  price: number;
  eventCapacity: number;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface NewEventFormProps {
  onSubmit: (data: EventFormData) => void;
}

const eventDefaultDate = new Date();
eventDefaultDate.setDate(eventDefaultDate.getDate() + 90);

export default function NewEventForm({ onSubmit }: NewEventFormProps) {
  const methods = useForm<EventFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      eventCapacity: 10,
      price: 0,
      cep: "",
      nome: "",
      eventDate: eventDefaultDate,
      ...adressDefaultValues,
    },
  });

  const onSubmitInterno = (data: EventFormData) => {
    try {
      console.log("Dados formatados:", data);

      toast.success("Evento criado com sucesso!");

      methods.reset();
      onSubmit(data);
    } catch (error) {
      toast.error("Algo deu errado, tente novamente mais tarde");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmitInterno)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginInline: "auto",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Impede o envio acidental
          }
        }}
      >
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

        <div style={{ display: "flex", gap: "10px" }}>
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

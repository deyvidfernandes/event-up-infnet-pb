import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signup.module.css";

import * as yup from "yup";
import { useNavigate } from "react-router";
import { login } from "../../../lib/util/mockLocalStorage";
import Button from "../../ui/Button/Button";
import Link from "../../ui/Link/Link";
import FormInputField from "../../ui/FormInputField/FormInputField";
import { AccountTypes } from "@/types/user";

const phoneRegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const schema = yup.object({
  user: yup
    .string()
    .email("O email inserido é inválido")
    .required("O email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .required("A senha é obrigatória"),
  verifyPassword: yup
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .required("A confirmação é obrigatória")
    .oneOf([yup.ref('password')], 'As senhas não conferem'),
  nameInput: yup
    .string()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Use apenas letras no nome')
    .required("O nome é obrigatório"),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Telefone inválido. Use o formato (11) 99999-9999')
    .required('O telefone é obrigatório'),
  accountType: yup
    .string()
    .required('Selecione o tipo de conta'),
});

export default function SignupForm() {
  const navigate = useNavigate();
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
      nameInput: "",
      phone: "",
      verifyPassword: "",
      accountType: "participante" 
    },
    resolver: yupResolver(schema),
  });

  type SignupFormDataType = yup.InferType<typeof schema>

  const { user, password, nameInput, phone, verifyPassword, accountType } = watch();

  const handleLogin = (data: SignupFormDataType) => {
    login({
      email: data.user,
      nome: data.nameInput,
      accountType: data.accountType as AccountTypes
    })
    navigate("/u")
  }

  return (
    <main style={{ padding: "32px" }}>
      <form className={styles.formContainer} onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.formInputsContainer}>
          <FormInputField 
            label="Tipo de conta"
            type="radio"
            value={accountType}
            onChange={(event) => setValue("accountType", event.target.value)}
            errorMessage={errors.accountType?.message}
            options={[
              { label: "Participante", value: "participante" },
              { label: "Organizador", value: "organizador" }
            ]}
          />

          <FormInputField 
            label="Nome Completo"
            value={nameInput}
            onChange={(event) => setValue("nameInput", event.target.value)}
            placeholder="Como você se chama?"
            type="text"
            errorMessage={errors.nameInput?.message}
          />

          <FormInputField 
            label="E-mail"
            value={user}
            onChange={(event) => setValue("user", event.target.value)}
            placeholder="Insira seu melhor Email"
            type="text"
            errorMessage={errors.user?.message}
          />

          <FormInputField 
            label="Telefone"
            value={phone}
            maskType="tel"
            onChange={(event) => setValue("phone", event.target.value)}
            placeholder="Insira seu telefone"
            type="text"
            errorMessage={errors.phone?.message}
          />
        
          <FormInputField 
            label="Senha"
            value={password}
            onChange={(event) => setValue("password", event.target.value)}
            placeholder="Crie sua senha"
            type="password"
            errorMessage={errors.password?.message}
          />

          <FormInputField 
            label="Confirmação de Senha"
            value={verifyPassword}
            onChange={(event) => setValue("verifyPassword", event.target.value)}
            placeholder="Confirme a senha"
            type="password"
            errorMessage={errors.verifyPassword?.message}
          />

        </div>
        <Button type="submit">
          Entrar
        </Button>
        <Link href="/login">Já tenho uma conta</Link>
      </form>
    </main>
  );
}
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signup.module.css";

import * as yup from "yup";
import { useNavigate } from "react-router";
import { login } from "../../util/mockLocalStorage";
import Button from "../button/Button";
import Link from "../Link/Link";
import FormInputField from "../FormInputField/FormInputField";

const phoneRegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const schema = yup.object({
  user: yup
    .string()
    .email("O email inserido é inválido"),
  password: yup
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .required(),
  verifyPassword: yup
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .required()
    .oneOf([yup.ref('password')], 'As senhas não conferem'),
  nameInput: yup
    .string()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Use apenas letras no nome')
    .required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Telefone inválido. Use o formato (11) 99999-9999')
    .required('O telefone é obrigatório'),
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
      verifyPassword: ""
    },
    resolver: yupResolver(schema),
  });

  const { user, password, nameInput, phone, verifyPassword} = watch();

  const handleLogin = () => {
    login({})
    navigate("/u")
  }

  return (
    <main style={{ padding: "32px" }}>
        <form className={styles.formContainer}>
          <FormInputField 
            value={nameInput}
            onChange={(event) => setValue("user", event.target.value)}
            placeholder="Como você se chama?"
            type="text"
            errorMessage={errors.nameInput?.message}
          />
          <FormInputField 
            value={user}
            onChange={(event) => setValue("user", event.target.value)}
            placeholder="Insira seu melhor Email"
            type="email"
            errorMessage={errors.user?.message}
          />
          <FormInputField 
            value={phone}
            mask="(##) #####-####"
            onChange={(event) => setValue("phone", event.target.value)}
            placeholder="Insira seu telefone"
            type="string"
            errorMessage={errors.phone?.message}
          />
          <FormInputField 
            value={password}
            onChange={(event) => setValue("password", event.target.value)}
            placeholder="Crie sua senha"
            type="password"
            errorMessage={errors.password?.message}
          />
          <FormInputField 
            value={verifyPassword}
            onChange={(event) => setValue("verifyPassword", event.target.value)}
            placeholder="Confirme a senha"
            type="password"
            errorMessage={errors.verifyPassword?.message}
          />

          <Button
            onClick={handleSubmit(handleLogin)}
          >
            Entrar
          </Button>
          <Link href="/login">Já tenho uma conta</Link>
        </form>
    </main>
  );
}

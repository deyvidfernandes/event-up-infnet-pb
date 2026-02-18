import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./login.module.css";

import * as yup from "yup";
import { useNavigate } from "react-router";
import { login } from "../../util/mockLocalStorage";
import Button from "../button/Button";

const schema = yup.object({
  user: yup
    .string()
    .email("O email inserido é inválido"),
  password: yup
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres")
    .required() 
});

export default function LoginForm() {
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
    },
    resolver: yupResolver(schema),
  });

  const { user, password} = watch();

  const handleLogin = () => {
    login()
    navigate("/u")
  }

  return (
    <main style={{ padding: "32px" }}>
        <form className={styles.formContainer}>
          <div className={styles.formInput}>
            <input
              value={user}
              onChange={(event) => setValue("user", event.target.value)}
              placeholder="Insira o Email"
              type="email"
            />
            <p className={styles.errorLabel}>{errors.user?.message}</p>
          </div>

            <div className={styles.formInput}>
                <input
                value={password}
                onChange={(event) => setValue("password", event.target.value)}
                placeholder="Insira a Senha"
                type="password"
                />
                <p className={styles.errorLabel}>{errors.password?.message}</p>
            </div>

            <Button
              onClick={handleSubmit(handleLogin)}
            >
              Entrar
            </Button>
        </form>
    </main>
  );
}

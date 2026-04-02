import LoginForm from "../../components/features/LoginForm/LoginForm";
import SignupForm from "../../components/features/SingnupForm/SignupForm";
import styles from "./accountPage.module.css";

type AccountPageProps = {
  view: "signup" | "login";
};

export default function AccountPage({ view }: AccountPageProps) {
  return (
    <main className={`${styles.loginPage} ${styles.pageContainer}`}>
      <div className={styles.imageSection}></div>
      <div className={styles.loginSection}>
        <div className={styles.loginContent}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
              color: "rgb(8, 109, 84)",
            }}
          >
            EventUp
          </h1>
          <p style={{ marginBottom: "2rem" }}>
            Bem vindo à sua nova Plataforma de Eventos
          </p>
          {view === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </main>
  );
}

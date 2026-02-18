import LoginForm from "../../components/LoginForm";
import styles from "./loginPage.module.css"

export default function LoginPage() {
  return (
    <main className={`${styles.loginPage} ${styles.pageContainer}`}>
      <div className={styles.imageSection}></div>
      <div className={styles.loginSection}>

        <div className={styles.loginContent}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "rgb(8, 109, 84)"}}>EventUp</h1>
          <p style={{ marginBottom: "2rem" }}>Bem vindo à sua nova Plataforma de Eventos</p>
          <LoginForm />
        </div>
        
      </div>
    </main>
  );
}

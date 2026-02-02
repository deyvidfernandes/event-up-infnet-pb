import LoginForm from "../../components/LoginForm";

const pageContainerStyles = {
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  width: "100%",
};

const imageSectionStyles = {
  flex: 1,
  background: "url('/cover.png') center/cover no-repeat",
  display: "block",
};

const loginSectionStyles = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
};

const loginContentStyles = {
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center"
};

export default function LoginPage() {
  return (
    <main style={pageContainerStyles} className="login-page">
      <div style={imageSectionStyles} className="image-section"></div>
      <div style={loginSectionStyles} className="login-section">

        <div style={loginContentStyles}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "rgb(8, 109, 84)"}}>EventUp</h1>
          <p style={{ marginBottom: "2rem" }}>Bem vindo à sua nova Plataforma de Eventos</p>
          <LoginForm />
        </div>
        
      </div>
    </main>
  );
}

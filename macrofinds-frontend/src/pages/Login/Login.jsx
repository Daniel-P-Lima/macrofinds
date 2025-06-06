import { useEffect } from "react";
import "../../assets/login.css";   
import "typeface-inter";

export default function Login() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      
      <hr className="full-hr" />

     
      <div className="login-wrapper">
        <div className="login-card">
          <h1 className="login-title">MacroFinds</h1>

          <form>
            <div className="input-field">
              <input id="email" type="email" className="validate" />
              <label htmlFor="email">email</label>
            </div>

            <div className="input-field">
              <input id="senha" type="password" className="validate" />
              <label htmlFor="senha">senha</label>
            </div>

            <button
              type="submit"
              className="btn btn-login waves-effect waves-light"
            >
              Login
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Novo aqui? <a href="/register">Registre-se</a>
          </p>

      
          <div className="divider-wrapper">
            <div className="divider-line"></div>
            <span>ou</span>
            <div className="divider-line"></div>
          </div>


          <button className="btn btn-google z-depth-0">
            <span style={{ fontWeight: 700 }}>G</span>
            Continuar com o Google
          </button>
        </div>
      </div>

      <hr className="full-hr" />
    </>
  );
}

import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import styles from "./styles.module.scss";



export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

   

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        Entrar com Github
      </a>
    </div>
  );
}

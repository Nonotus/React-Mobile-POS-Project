import { useNavigate } from "react-router-dom";
import { styles } from "../styles/styles";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Mobile POS</h1>

      <button
        style={styles.button}
        onClick={() => navigate("/scan")}
      >
        Buying
      </button>

      <button
        style={styles.exitButton}
        onClick={() => window.close()}
      >
        Exit
      </button>
    </div>
  );
}
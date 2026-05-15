import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../styles/styles";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastOrder = location.state?.lastOrder;

  return (
    <div style={styles.container}>
      {lastOrder && (
        <div style={{ ...styles.card, marginBottom: "20px", textAlign: "left" }}>
          <h3 style={{ marginTop: 0 }}>Previous Order</h3>
          <p><strong>Item:</strong> {lastOrder.item}</p>
          <p><strong>Quantity:</strong> {lastOrder.quantity}</p>
          {lastOrder.type === "rice_meal" && (
            <p><strong>Rice:</strong> {lastOrder.riceQuantity}</p>
          )}
          <p><strong>Total:</strong> ₱{lastOrder.total.toFixed(2)}</p>
        </div>
      )}

      <h1>Mobile POS</h1>

      <button
        style={styles.button}
        onClick={() => navigate("/scan")}
      >
        Buying
      </button>
    </div>
  );
}
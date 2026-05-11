import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { styles } from "../styles/styles";
import saveToGoogleSheets from "../services/googleSheets";

export default function ItemPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state?.item || "Unknown";
  const price = location.state?.price || 0;

  const [quantity, setQuantity] = useState(1);

  const total = price * quantity;

const acceptPurchase = async () => {
  const success = await saveToGoogleSheets({
    datetime: new Date().toLocaleString(),
    item,
    price,
    quantity,
  });

  if (success) {
    alert("Saved!");

    navigate("/");
  } else {
    alert("Failed to save.");
  }
};
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{item}</h1>

        <h2>₱{price}</h2>

        <h2>Quantity: {quantity}</h2>

        {/* +1 and -1 */}
        <div style={styles.row}>
          <button
            style={styles.smallButton}
            onClick={() =>
              setQuantity((q) => Math.max(0, q - 1))
            }
          >
            -1
          </button>

          <button
            style={styles.smallButton}
            onClick={() => setQuantity((q) => q + 1)}
          >
            +1
          </button>
        </div>

        {/* +0.5 and -0.5 */}
        <div style={styles.row}>
          <button
            style={styles.smallButton}
            onClick={() =>
              setQuantity((q) => Math.max(0, q - 0.5))
            }
          >
            -0.5
          </button>

          <button
            style={styles.smallButton}
            onClick={() => setQuantity((q) => q + 0.5)}
          >
            +0.5
          </button>
        </div>

        <h2>Total: ₱{total.toFixed(2)}</h2>

        <div style={styles.row}>
          <button
            style={styles.acceptButton}
            onClick={acceptPurchase}
          >
            Accept
          </button>

          <button
            style={styles.cancelButton}
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
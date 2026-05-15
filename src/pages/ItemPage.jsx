import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { styles } from "../styles/styles";
import saveToGoogleSheets from "../services/googleSheets";

export default function ItemPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state?.item || "Unknown";

  const price = Number(location.state?.price || 0);

  const type = location.state?.type || "normal";

  const defaultRice = Number(location.state?.rice || 0);

  const [quantity, setQuantity] = useState(1);

  const [riceQuantity, setRiceQuantity] =
    useState(defaultRice);

  const riceExtra = riceQuantity * 20;

  const total =
    (price * quantity) + riceExtra;

  const acceptPurchase = () => {
    const orderData = {
      datetime: new Date().toLocaleString(),
      item,
      price,
      quantity,
      riceQuantity,
      type,
      total,
    };

    // Trigger save in background without 'await' to avoid UI blocking
    saveToGoogleSheets(orderData);

    // Immediate navigation back to Home with order data
    navigate("/", { state: { lastOrder: orderData } });
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{item}</h1>

        <h2>₱{price}</h2>

        <h2>Meal Quantity: {quantity}</h2>

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
            onClick={() =>
              setQuantity((q) => q + 0.5)
            }
          >
            +0.5
          </button>
        </div>

        {type === "rice_meal" && (
          <>
            <h2>Rice Quantity: {riceQuantity}</h2>

            <div style={styles.row}>
              <button
                style={styles.smallButton}
                onClick={() =>
                  setRiceQuantity((q) =>
                    Math.max(0, q - 0.5)
                  )
                }
              >
                -0.5 Rice
              </button>

              <button
                style={styles.smallButton}
                onClick={() =>
                  setRiceQuantity((q) => q + 0.5)
                }
              >
                +0.5 Rice
              </button>
            </div>
          </>
        )}

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
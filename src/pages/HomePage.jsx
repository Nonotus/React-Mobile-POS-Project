import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getOfflineOrders,
  clearOfflineOrders
} from "../services/indexedDb";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../styles/styles";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastOrder = location.state?.lastOrder;
  const [hasOfflineData, setHasOfflineData] =
    useState(false);

  useEffect(() => {
    async function checkOfflineData() {
      const orders =
        await getOfflineOrders();

      setHasOfflineData(
        orders.length > 0
      );
    }

    checkOfflineData();
  }, [location.state]);

  async function downloadOfflineData() {

    const orders =
      await getOfflineOrders();

    if (!orders.length) return;

    const csvRows = [];

    csvRows.push(
      [
        "Date",
        "Item",
        "Quantity",
        "Rice",
        "Type",
        "Total"
      ].join(",")
    );

    orders.forEach(order => {
      csvRows.push(
        [
          order.datetime,
          order.item,
          order.quantity,
          order.riceQuantity,
          order.type,
          order.total
        ].join(",")
      );
    });

    const csv =
      csvRows.join("\n");

    const blob = new Blob(
      [csv],
      { type: "text/csv" }
    );

    const url =
      URL.createObjectURL(blob);

    const date =
      new Date()
        .toISOString()
        .split("T")[0];

    const a =
      document.createElement("a");

    a.href = url;
    a.download = `${date}.csv`;

    a.click();

    URL.revokeObjectURL(url);

    await clearOfflineOrders();

    setHasOfflineData(false);
  }


  return (
    <div style={styles.container}>
      {lastOrder && (
        <div style={{ ...styles.card, marginBottom: "20px", textAlign: "left" }}>
          <h3 style={{ marginTop: 0 }}>Order Submitted</h3>
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
      {
        hasOfflineData && (
          <button
            style={{
              ...styles.button,
              marginTop: "10px",
              backgroundColor: "#28a745"
            }}
            onClick={downloadOfflineData}
          >
            Download Offline Data
          </button>
        )
      }
    </div>
  );
}
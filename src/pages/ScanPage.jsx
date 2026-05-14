import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
        supportedScanTypes: [],
      },
      false,
    );

    scanner.render(
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText);

          scanner.clear();

          navigate("/item", {
            state: {
              item: data.name,
              price: data.price,
            },
          });
        } catch (err) {
          alert("Invalid QR");
        }
      },
      () => {},
    );

    // Force back camera
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // Try to find back camera
          const backCamera = devices.find(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear"),
          );

          if (backCamera) {
            scanner.applyVideoConstraints({
              deviceId: { exact: backCamera.id },
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

     return () => {
      html5QrCode
        .stop()
        .catch(() => {});
    };
  }, [navigate]);

  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
      }}
    >
      <h2>Scan QR Code</h2>

      <div id="reader"></div>
    </div>
  );
}
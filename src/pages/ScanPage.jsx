import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
  const navigate = useNavigate();
  const html5QrCode = new Html5Qrcode("reader");

  useEffect(() => {
    const startScanner = async () => {
      try {
        // Get cameras
        const devices = await Html5Qrcode.getCameras();

        console.log(devices);

        if (!devices || devices.length === 0) {
          alert("No cameras found");
          return;
        }

        // Find back camera
        const backCamera = devices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear") ||
            device.label.toLowerCase().includes("environment"),
        );

        const cameraId = backCamera ? backCamera.id : devices[0].id;

        await html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },

          // SUCCESS
          (decodedText) => {
            try {
              const data = JSON.parse(decodedText);

              html5QrCode.stop();

              navigate("/item", {
                state: {
                  item: data.item || data.name,
                  price: data.price,
                },
              });
            } catch (err) {
              alert("Invalid QR");
            }
          },

          // ERROR
          () => {},
        );
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, [navigate]);

  // =========================
  // IMAGE FILE QR SCAN
  // =========================

  const handleFileScan = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const result = await html5QrCode.scanFile(file, true);

      console.log(result);

      const data = JSON.parse(result);

      navigate("/item", {
        state: {
          item: data.item || data.name,
          price: data.price,
        },
      });
    } catch (err) {
      console.error(err);

      alert("Failed to scan image QR");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
      }}
    >
      <h2>Scan QR Code</h2>

      <div id="reader"></div>

      <hr style={{ margin: 20 }} />

      <h3>Or Upload QR Image</h3>

      <input type="file" accept="image/*" onChange={handleFileScan} />
    </div>
  );
}

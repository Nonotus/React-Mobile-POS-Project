
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanPage() {

  const navigate = useNavigate();

  useEffect(() => {

    const html5QrCode = new Html5Qrcode("reader");

    const startScanner = async () => {

      try {

        // Get available cameras
        const devices = await Html5Qrcode.getCameras();

        console.log(devices);

        if (!devices || devices.length === 0) {
          alert("No cameras found");
          return;
        }

        // Try finding rear camera
        const backCamera = devices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear") ||
            device.label.toLowerCase().includes("environment")
        );

        const cameraId = backCamera
          ? backCamera.id
          : devices[0].id;

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
                  item: data.item,
                  price: data.price,
                },
              });

            } catch (err) {

              console.error(err);

              alert("Invalid QR");
            }
          },

          // ERROR
          () => {}
        );

      } catch (err) {

        console.error(err);
      }
    };

    startScanner();

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
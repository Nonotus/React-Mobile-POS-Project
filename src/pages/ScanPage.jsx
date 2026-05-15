import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

export default function ScanPage() {
  const navigate = useNavigate();

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        console.log(devices);
      })
      .catch((err) => {
        console.log(err);
      });

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
        videoConstraints: {
          facingMode: "environment",
        },
      },
      false,
    );

    scanner.render(
      (decodedText) => {
        try {
          // QR FORMAT:
          // {"name":"Coke","price":25}

          const cleanText = decodedText.trim();

          const data = JSON.parse(cleanText);

          console.log(data);
          console.log(decodedText);

          scanner.clear();

          navigate("/item", {
            state: {
              item: data.item || data.name,
              price: data.price,
              type: data.type || "normal",
              rice: data.rice || 0,
            },
          });
        } catch (err) {
          alert("Invalid QR");
        }
      },
      (error) => {
        console.log(error);
      },
    );

    return () => {
      scanner.clear().catch(() => { });
    };
  }, [navigate]);

  return (
    <div>
      <h2>Scan QR Code</h2>

      <div id="reader"></div>
    </div>
  );
}

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

          const data = JSON.parse(decodedText);
          console.log(data);

          scanner.clear();

          navigate("/item", {
            state: {
              item: data.item,
              price: data.price,
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
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  return (
    <div>
      <h2>Scan QR Code</h2>

      <div id="reader"></div>
    </div>
  );
}

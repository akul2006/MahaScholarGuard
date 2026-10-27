
import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
  version: string;
};

export default function BackendConnectionTest() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const baseUrl = (
          import.meta.env.VITE_API_BASE_URL ||
          "http://127.0.0.1:8000"
        ).replace(/\/$/, "");

        const response = await fetch(
          `${baseUrl}/api/health`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: HealthResponse = await response.json();

        if (data.status !== "ok") {
          throw new Error("Unexpected health response");
        }

        setConnected(true);
        setMessage(`${data.service} v${data.version} is running`);
      } catch (error) {
        if (controller.signal.aborted) return;

        setConnected(false);
        setMessage(
          "Cannot connect. Check that the FastAPI server is running."
        );
      }
    }

    checkBackend();

    return () => controller.abort();
  }, []);

  return (
    <div
      role="status"
      style={{
        padding: "12px 16px",
        border: "1px solid #88888855",
        borderRadius: "12px",
        margin: "12px 0",
      }}
    >
      <strong>
        Backend: {connected ? "Connected" : "Not connected"}
      </strong>
      <p style={{ marginBottom: 0 }}>{message}</p>
    </div>
  );
}

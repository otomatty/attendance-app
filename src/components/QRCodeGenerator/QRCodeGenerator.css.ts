import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
});

export const title = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "10px",
});

export const qrCodeImage = style({
  width: "200px",
  height: "200px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
});

export const printButton = style({
  padding: "10px 20px",
  fontSize: "1rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.1s",
  ":hover": {
    backgroundColor: "#0056b3",
  },
  ":active": {
    transform: "scale(0.98)",
  },
});

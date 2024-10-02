import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const dialog = style({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "80%",
  width: "400px",
});

export const title = style({
  fontSize: "1.5rem",
  marginBottom: "15px",
});

export const message = style({
  marginBottom: "20px",
});

export const buttonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
});

export const button = style({
  padding: "10px 20px",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
});

export const confirmButton = style({
  backgroundColor: "#28a745",
  color: "white",
  ":hover": {
    backgroundColor: "#218838",
  },
});

export const cancelButton = style({
  backgroundColor: "#dc3545",
  color: "white",
  ":hover": {
    backgroundColor: "#c82333",
  },
});

import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const title = style({
  fontSize: "1.5rem",
  marginBottom: "20px",
  color: "#333",
});

export const form = style({
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

export const input = style({
  padding: "8px 12px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ced4da",
  width: "80px",
  ":focus": {
    outline: "none",
    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
  },
});

export const button = style({
  padding: "8px 16px",
  fontSize: "1rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  ":hover": {
    backgroundColor: "#218838",
  },
});

export const errorMessage = style({
  color: "#dc3545",
  marginTop: "10px",
});

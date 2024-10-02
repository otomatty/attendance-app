import { style } from "@vanilla-extract/css";

export const container = style({
  overflowX: "auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "20px",
});

export const title = style({
  fontSize: "1.5rem",
  marginBottom: "20px",
  color: "#333",
});

export const table = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
});

export const th = style({
  backgroundColor: "#f8f9fa",
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
  fontWeight: "bold",
  color: "#495057",
});

export const td = style({
  padding: "12px 16px",
  borderBottom: "1px solid #dee2e6",
});

export const button = style({
  padding: "6px 12px",
  fontSize: "0.875rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});

export const errorMessage = style({
  color: "#dc3545",
  marginTop: "10px",
});

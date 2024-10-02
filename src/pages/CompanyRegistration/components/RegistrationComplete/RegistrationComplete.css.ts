import { style } from "@vanilla-extract/css";

export const container = style({
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#e8f5e9",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const title = style({
  fontSize: "2rem",
  color: "#2e7d32",
  marginBottom: "1rem",
});

export const message = style({
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "2rem",
});

export const link = style({
  color: "#007bff",
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
});

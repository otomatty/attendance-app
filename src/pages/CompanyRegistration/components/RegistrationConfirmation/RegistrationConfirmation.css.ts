import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundColor: "#f9f9f9",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const confirmationItem = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
  padding: "0.5rem 0",
  borderBottom: "1px solid #eee",
});

export const label = style({
  fontWeight: "bold",
});

export const value = style({
  color: "#555",
});

export const buttonGroup = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1.5rem",
});

export const button = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
});

export const confirmButton = style([
  button,
  {
    backgroundColor: "#28a745",
    color: "white",
    ":hover": {
      backgroundColor: "#218838",
    },
  },
]);

export const editButton = style([
  button,
  {
    backgroundColor: "#6c757d",
    color: "white",
    ":hover": {
      backgroundColor: "#5a6268",
    },
  },
]);

export const title = style({
  fontSize: "1.8rem",
  color: "#333",
  marginBottom: "1.5rem",
});

export const error = style({
  color: "red",
  marginBottom: "1rem",
});

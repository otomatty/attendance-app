import { style } from "@vanilla-extract/css";

export const form = style({
  display: "grid",
  gap: "1rem",
  maxWidth: "500px",
  margin: "0 auto",
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
});

export const label = style({
  marginBottom: "0.5rem",
});

export const input = style({
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

export const textarea = style({
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  minHeight: "100px",
});

export const checkbox = style({
  marginRight: "0.5rem",
});

export const buttonGroup = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
});

export const button = style({
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export const submitButton = style([
  button,
  {
    backgroundColor: "#4CAF50",
    color: "white",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
]);

export const cancelButton = style([
  button,
  {
    backgroundColor: "#f44336",
    color: "white",
    ":hover": {
      backgroundColor: "#d32f2f",
    },
  },
]);

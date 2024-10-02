import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
});

export const label = style({
  marginBottom: "0.5rem",
  fontWeight: "bold",
});

export const input = style({
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

export const submitButton = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});

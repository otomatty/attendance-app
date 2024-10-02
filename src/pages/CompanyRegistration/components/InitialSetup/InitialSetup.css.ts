import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "600px",
  margin: "0 auto",
  padding: "2rem",
});

export const title = style({
  fontSize: "1.8rem",
  color: "#333",
  marginBottom: "1.5rem",
});

export const step = style({
  marginBottom: "2rem",
});

export const stepTitle = style({
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "0.5rem",
});

export const input = style({
  width: "100%",
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

export const button = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#45a049",
  },
});

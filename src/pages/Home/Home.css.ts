import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center",
});

export const title = style({
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "1rem",
});

export const description = style({
  fontSize: "1.2rem",
  color: "#666",
  marginBottom: "2rem",
});

export const buttonGroup = style({
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  flexWrap: "wrap",
});

export const button = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  color: "white",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "4px",
  textDecoration: "none",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});

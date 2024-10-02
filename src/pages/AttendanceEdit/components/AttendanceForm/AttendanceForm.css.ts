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
  borderRadius: "4px",
  border: "1px solid #ccc",
});

export const select = style({
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
});

export const textarea = style({
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
});

export const button = style({
  padding: "0.5rem 1rem",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});

export const autocompleteContainer = style({
  position: "relative",
});

export const autocompleteList = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderTop: "none",
  maxHeight: "200px",
  overflowY: "auto",
  zIndex: 1000,
});

export const autocompleteItem = style({
  padding: "8px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#f0f0f0",
  },
});

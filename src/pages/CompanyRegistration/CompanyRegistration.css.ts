import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "2rem",
  fontFamily: "Arial, sans-serif",
});

export const title = style({
  fontSize: "2rem",
  color: "#333",
  marginBottom: "1rem",
});

export const stepIndicator = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "2rem",
});

export const step = style({
  flex: 1,
  textAlign: "center",
  padding: "0.5rem",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ddd",
});

export const activeStep = style({
  backgroundColor: "#e0e0e0",
  fontWeight: "bold",
});

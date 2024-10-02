import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem",
});

export const title = style({
  fontSize: "2rem",
  marginBottom: "1.5rem",
  color: "#333",
});

export const addButton = style({
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  marginBottom: "1rem",
  ":hover": {
    backgroundColor: "#45a049",
  },
});

export const loadingText = style({
  fontSize: "1.2rem",
  color: "#666",
});

export const errorMessage = style({
  color: "#D32F2F",
  backgroundColor: "#FFCDD2",
  padding: "10px",
  borderRadius: "4px",
  marginTop: "1rem",
});

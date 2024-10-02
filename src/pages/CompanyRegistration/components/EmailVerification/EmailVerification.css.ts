import { style } from "@vanilla-extract/css";

export const container = style({
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#e3f2fd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const title = style({
  fontSize: "1.8rem",
  color: "#1565c0",
  marginBottom: "1rem",
});

export const message = style({
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "2rem",
});

export const resendButton = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  backgroundColor: "#2196f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#1976d2",
  },
});

export const error = style({
  color: "red",
  marginBottom: "1rem",
});

export const verifyButton = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  marginLeft: "1rem",
  ":hover": {
    backgroundColor: "#45a049",
  },
});

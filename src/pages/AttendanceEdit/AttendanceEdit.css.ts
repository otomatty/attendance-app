import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "2rem",
});

export const title = style({
  fontSize: "2rem",
  marginBottom: "1.5rem",
  color: "#333",
});

export const formSection = style({
  marginBottom: "2rem",
});

export const historySection = style({
  marginTop: "2rem",
});

export const message = style({
  padding: "1rem",
  borderRadius: "4px",
  marginBottom: "1rem",
});

export const errorMessage = style([
  message,
  {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  },
]);

export const successMessage = style([
  message,
  {
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  },
]);

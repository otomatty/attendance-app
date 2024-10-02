import { style } from "@vanilla-extract/css";

export const adminHeader = style({
  backgroundColor: "#f8f9fa",
  padding: "1rem 0",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

export const nav = style({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
});

export const ul = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  justifyContent: "space-between",
});

export const li = style({
  margin: "0 0.5rem",
});

export const link = style({
  textDecoration: "none",
  color: "#333",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "background-color 0.3s ease",

  ":hover": {
    backgroundColor: "#e9ecef",
  },
});

import { style } from "@vanilla-extract/css";

export const container = style({
  marginTop: "2rem",
});

export const title = style({
  fontSize: "1.5rem",
  marginBottom: "1rem",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const th = style({
  backgroundColor: "#f8f9fa",
  padding: "0.5rem",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
});

export const td = style({
  padding: "0.5rem",
  borderBottom: "1px solid #dee2e6",
});

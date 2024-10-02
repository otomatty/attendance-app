import { style } from "@vanilla-extract/css";

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
});

export const th = style({
  backgroundColor: "#f8f9fa",
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
});

export const td = style({
  padding: "12px",
  borderBottom: "1px solid #dee2e6",
});

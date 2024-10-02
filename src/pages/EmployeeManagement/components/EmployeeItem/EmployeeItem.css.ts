import { style } from "@vanilla-extract/css";

export const tr = style({
  ":hover": {
    backgroundColor: "#f8f9fa",
  },
});

export const button = style({
  padding: "5px 10px",
  fontSize: "0.875rem",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  marginRight: "5px",
});

export const editButton = style({
  backgroundColor: "#ffc107",
  color: "black",
  ":hover": {
    backgroundColor: "#e0a800",
  },
});

export const deleteButton = style({
  backgroundColor: "#dc3545",
  color: "white",
  ":hover": {
    backgroundColor: "#c82333",
  },
});

export const qrButton = style({
  backgroundColor: "#17a2b8",
  color: "white",
  ":hover": {
    backgroundColor: "#138496",
  },
});

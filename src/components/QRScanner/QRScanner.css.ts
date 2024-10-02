import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});

export const scannerContainer = style({
  width: "100%",
  maxWidth: "500px",
  aspectRatio: "1",
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px",
});

export const backButton = style({
  padding: "10px 20px",
  fontSize: "1rem",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  ":hover": {
    backgroundColor: "#5a6268",
  },
});

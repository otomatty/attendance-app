import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
});

export const title = style({
  fontSize: "2rem",
  color: "#333",
  marginBottom: "20px",
  textAlign: "center",
});

export const buttonContainer = style({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px",
});

export const button = style({
  width: "150px",
  height: "150px",
  fontSize: "1.2rem",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "transform 0.1s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  ":active": {
    transform: "scale(0.98)",
  },
});

export const checkInButton = style({
  backgroundColor: "#28a745", // 緑色
  ":hover": {
    backgroundColor: "#218838",
  },
});

export const checkOutButton = style({
  backgroundColor: "#dc3545", // 赤色
  ":hover": {
    backgroundColor: "#c82333",
  },
});

// メディアクエリを追加して、大きな画面でのレイアウトを調整
export const largeScreenButtonContainer = style({
  "@media": {
    "(min-width: 768px)": {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
});

export const largeScreenButton = style({
  "@media": {
    "(min-width: 768px)": {
      width: "40%",
      maxWidth: "none",
    },
  },
});

export const adminLink = style({
  display: "block",
  textAlign: "center",
  color: "#007bff",
  textDecoration: "none",
  marginTop: "20px",
  ":hover": {
    textDecoration: "underline",
  },
});

export const employeeNameClass = style({
  fontSize: "1.2rem",
  textAlign: "center",
  marginTop: "20px",
});

export const errorClass = style({
  color: "red",
  textAlign: "center",
  marginTop: "20px",
});

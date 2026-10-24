import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={56} sx={{ color: "rgb(204, 51, 153)" }} />
    </div>
  );
}

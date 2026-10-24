export default function ErrorMessage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "0 24px",
        textAlign: "center",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <span style={{ fontSize: 24, fontWeight: 800, color: "rgb(204, 51, 153)" }}>
        Oh no! Something went wrong..
      </span>
      <span style={{ fontSize: 14, color: "rgba(139, 128, 128, 0.9)" }}>
        Please know we're working to fix the issue. You can try refreshing
        the browser in the meantime.
      </span>
    </div>
  );
}

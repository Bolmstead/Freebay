import MuiAlert from "@mui/material/Alert";

/** Presentational component for showing alerts using MUI. */

function Alert({ type = "error", messages = [] }) {
  if (!messages.length) return null;

  return (
    <MuiAlert severity={type} sx={{ mb: 2 }}>
      {messages.map((msg) => (
        <p key={msg} style={{ margin: 0 }}>
          {msg}
        </p>
      ))}
    </MuiAlert>
  );
}

export default Alert;

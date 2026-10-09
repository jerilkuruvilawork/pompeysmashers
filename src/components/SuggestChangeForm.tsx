import { useState, type FormEvent } from "react";
import { SESSIONS_CONTACT_EMAIL } from "../config";
import { buildSessionsMailto } from "../utils/mailto";

type Props = {
  sessionName?: string;
  compact?: boolean;
};

export default function SuggestChangeForm({ sessionName, compact }: Props) {
  const [details, setDetails] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const href = buildSessionsMailto({
      to: SESSIONS_CONTACT_EMAIL,
      sessionName,
      details,
      reporterEmail,
    });
    window.location.href = href;
  }

  const labelStyle = { display: "block" as const, fontWeight: 600, marginBottom: 6 };
  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        textAlign: "left",
        marginTop: compact ? 0 : 16,
        padding: compact ? 0 : 20,
        background: compact ? "transparent" : "#fff",
        borderRadius: 12,
        border: compact ? "none" : "1px solid #e0e0e0",
      }}
    >
      {!compact && (
        <>
          <h2 style={{ marginTop: 0, color: "#1a237e", fontSize: "1.35rem" }}>
            Send a correction or new session
          </h2>
          <p style={{ color: "#424242", lineHeight: 1.5 }}>
            This opens your email app with a draft to{" "}
            <a href={`mailto:${SESSIONS_CONTACT_EMAIL}`}>{SESSIONS_CONTACT_EMAIL}</a>.
            No account or login required.
          </p>
        </>
      )}

      {sessionName && (
        <p style={{ margin: "0 0 12px", color: "#616161", fontSize: 14 }}>
          Updating: <strong>{sessionName}</strong>
        </p>
      )}

      <label style={labelStyle} htmlFor={compact ? "corr-details-sm" : "corr-details"}>
        What should change?
      </label>
      <textarea
        id={compact ? "corr-details-sm" : "corr-details"}
        required
        rows={compact ? 3 : 5}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="e.g. Now uses plastic shuttles, price is £6, moved to 7:30pm…"
        style={{ ...inputStyle, resize: "vertical", marginBottom: 12 }}
      />

      <label style={labelStyle} htmlFor={compact ? "corr-email-sm" : "corr-email"}>
        Your email (optional, so we can reply)
      </label>
      <input
        id={compact ? "corr-email-sm" : "corr-email"}
        type="email"
        value={reporterEmail}
        onChange={(e) => setReporterEmail(e.target.value)}
        placeholder="you@example.com"
        style={{ ...inputStyle, marginBottom: 16 }}
      />

      <button
        type="submit"
        style={{
          background: "#1976d2",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Open email to send
      </button>
    </form>
  );
}

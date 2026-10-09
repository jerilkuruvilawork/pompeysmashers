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
    window.location.href = buildSessionsMailto({
      to: SESSIONS_CONTACT_EMAIL,
      sessionName,
      details,
      reporterEmail,
    });
  }

  return (
    <form className={`feedback-form${compact ? " feedback-form--compact" : ""}`} onSubmit={handleSubmit}>
      {!compact && (
        <>
          <h2>Send a correction or new session</h2>
          <p className="feedback-form__intro">
            Opens your email app with a draft to{" "}
            <a href={`mailto:${SESSIONS_CONTACT_EMAIL}`}>{SESSIONS_CONTACT_EMAIL}</a>. No login
            required.
          </p>
        </>
      )}

      {sessionName && (
        <p className="feedback-form__session">
          Updating: <strong>{sessionName}</strong>
        </p>
      )}

      <label htmlFor="corr-details">What should change?</label>
      <textarea
        id="corr-details"
        required
        rows={compact ? 3 : 5}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="e.g. Plastic shuttles, £6, now 7:30pm…"
      />

      <label htmlFor="corr-email">Your email (optional)</label>
      <input
        id="corr-email"
        type="email"
        value={reporterEmail}
        onChange={(e) => setReporterEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <button type="submit" className="btn btn--primary">
        Open email to send
      </button>
    </form>
  );
}

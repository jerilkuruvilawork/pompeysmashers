import { useState, type FormEvent } from "react";
import { submitCorrection } from "../utils/submitCorrection";

type Props = {
  sessionName?: string;
  compact?: boolean;
};

type Status = "idle" | "sending" | "success" | "error";

export default function SuggestChangeForm({ sessionName, compact }: Props) {
  const [details, setDetails] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const result = await submitCorrection({
      message: details,
      sessionName,
      reporterEmail,
    });

    if (result.ok) {
      setStatus("success");
      setDetails("");
      setReporterEmail("");
      return;
    }

    setStatus("error");
    setErrorMessage(result.error);
  }

  if (status === "success") {
    return (
      <div className="feedback-form feedback-form--success" role="status">
        <h2>Thanks — we got your message</h2>
        <p>We’ll review the session listing and update the site when we can.</p>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => setStatus("idle")}
        >
          Send another correction
        </button>
      </div>
    );
  }

  return (
    <form className={`feedback-form${compact ? " feedback-form--compact" : ""}`} onSubmit={handleSubmit}>
      {!compact && (
        <>
          <h2>Send a correction or new session</h2>
          <p className="feedback-form__intro">
            Submit the form below. Your message goes to the site maintainer only — their email is
            not shown on this page.
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
        disabled={status === "sending"}
      />

      <label htmlFor="corr-email">Your email (optional, if you want a reply)</label>
      <input
        id="corr-email"
        type="email"
        value={reporterEmail}
        onChange={(e) => setReporterEmail(e.target.value)}
        placeholder="you@example.com"
        disabled={status === "sending"}
      />

      {status === "error" && (
        <p className="feedback-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send correction"}
      </button>
    </form>
  );
}

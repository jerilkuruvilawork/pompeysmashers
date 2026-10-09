import { MAINTAINER_EMAIL } from "../config";

export type CorrectionPayload = {
  message: string;
  sessionName?: string;
  reporterEmail?: string;
};

export async function submitCorrection(
  payload: CorrectionPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const subject = payload.sessionName
    ? `Portsmouth Badminton Hub: update for “${payload.sessionName}”`
    : "Portsmouth Badminton Hub: correction or new session";

  const body = [
    payload.message.trim(),
    "",
    "---",
    payload.sessionName ? `Session: ${payload.sessionName}` : "General feedback / new session",
  ].join("\n");

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(MAINTAINER_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: subject,
          message: body,
          email: payload.reporterEmail?.trim() || "anonymous@example.com",
          _replyto: payload.reporterEmail?.trim() || undefined,
          _captcha: "false",
        }),
      },
    );

    const data = (await response.json()) as { success?: string; message?: string };

    if (!response.ok) {
      return {
        ok: false,
        error: data.message ?? "Something went wrong. Please try again later.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}

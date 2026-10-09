export type CorrectionPayload = {
  message: string;
  sessionName?: string;
  reporterEmail?: string;
};

export async function submitCorrection(
  payload: CorrectionPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      ok: false,
      error:
        "The correction form is not active yet. The site owner needs to add a Web3Forms access key.",
    };
  }

  const subject = payload.sessionName
    ? `Portsmouth Badminton Hub: update for “${payload.sessionName}”`
    : "Portsmouth Badminton Hub: correction or new session";

  const lines = [
    payload.message.trim(),
    "",
    "---",
    payload.sessionName ? `Session: ${payload.sessionName}` : "General feedback / new session",
  ];

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        message: lines.join("\n"),
        email: payload.reporterEmail?.trim() || "noreply@portsmouthbadmintonhub.local",
        replyto: payload.reporterEmail?.trim() || undefined,
        from_name: "Portsmouth Badminton Hub visitor",
      }),
    });

    const data = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !data.success) {
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

export function isCorrectionFormConfigured(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
}

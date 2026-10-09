export function buildSessionsMailto(options: {
  to: string;
  sessionName?: string;
  details?: string;
  reporterEmail?: string;
}): string {
  const subject = options.sessionName
    ? `${options.sessionName} — update for Portsmouth Badminton Hub`
    : "Portsmouth Badminton Hub — correction or new session";

  const lines = [
    "Please describe what should change (time, venue, price, shuttle type, contact, etc.):",
    "",
    options.details?.trim() || "(your message here)",
    "",
    "---",
    options.sessionName ? `Session listed: ${options.sessionName}` : "General feedback / new session",
  ];

  if (options.reporterEmail?.trim()) {
    lines.push(`Reply-to: ${options.reporterEmail.trim()}`);
  }

  const params = new URLSearchParams();
  params.set("subject", subject);
  params.set("body", lines.join("\n"));

  return `mailto:${options.to}?${params.toString()}`;
}

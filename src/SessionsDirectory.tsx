import { useMemo, useState } from "react";
import {
  badmintonSessions,
  DAY_ORDER,
  SHUTTLE_LABELS,
  type DayOfWeek,
  type ShuttleType,
} from "./data/sessions";
import SuggestChangeForm from "./components/SuggestChangeForm";
import { buildSessionsMailto } from "./utils/mailto";
import { SESSIONS_CONTACT_EMAIL } from "./config";

const ALL_DAYS = "All days" as const;

function shuttleMatches(filter: ShuttleType | "all", sessionShuttle: ShuttleType): boolean {
  if (filter === "all") return true;
  if (filter === "plastic") {
    return sessionShuttle === "plastic" || sessionShuttle === "no-strings";
  }
  return sessionShuttle === filter;
}

function SessionCard({
  session,
  onSuggest,
}: {
  session: (typeof badmintonSessions)[number];
  onSuggest: (name: string) => void;
}) {
  const cardBg = session.unconfirmed ? "#fff8e1" : "#ffffff";

  return (
    <article
      style={{
        background: cardBg,
        border: "1px solid #e0e0e0",
        borderRadius: 10,
        padding: "14px 16px",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline" }}>
        <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#1a237e", flex: "1 1 200px" }}>
          {session.name}
        </h3>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: 6,
            background:
              session.shuttle === "plastic"
                ? "#e8f5e9"
                : session.shuttle === "feather"
                  ? "#fce4ec"
                  : session.shuttle === "no-strings"
                    ? "#e3f2fd"
                    : "#f5f5f5",
            color: "#333",
          }}
        >
          {SHUTTLE_LABELS[session.shuttle]}
        </span>
      </div>

      <p style={{ margin: "8px 0 4px", fontWeight: 600 }}>{session.time}</p>
      <p style={{ margin: "0 0 8px", color: "#424242" }}>
        {session.venue}
        <br />
        {session.address}
      </p>
      <p style={{ margin: "0 0 4px" }}>
        <strong>Level:</strong> {session.level}
      </p>
      {session.price && (
        <p style={{ margin: "0 0 4px" }}>
          <strong>Price:</strong> {session.price}
        </p>
      )}
      {session.shuttleNote && (
        <p style={{ margin: "0 0 4px", fontSize: 14, color: "#2e7d32" }}>{session.shuttleNote}</p>
      )}
      {(session.contact || session.phone || session.email) && (
        <p style={{ margin: "0 0 4px", fontSize: 14 }}>
          {session.contact && <span>{session.contact} </span>}
          {session.phone && (
            <a href={`tel:${session.phone.replace(/\s/g, "")}`} style={{ marginRight: 8 }}>
              {session.phone}
            </a>
          )}
          {session.email && <a href={`mailto:${session.email}`}>{session.email}</a>}
        </p>
      )}
      {session.link && (
        <p style={{ margin: "0 0 4px", fontSize: 14 }}>
          <a href={session.link} target="_blank" rel="noopener noreferrer">
            More info
          </a>
        </p>
      )}
      {session.notes && (
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "#616161", fontStyle: "italic" }}>
          {session.unconfirmed ? "⚠ " : ""}
          {session.notes}
        </p>
      )}

      <button
        type="button"
        onClick={() => onSuggest(session.name)}
        style={{
          marginTop: 12,
          background: "transparent",
          border: "1px solid #1976d2",
          color: "#1976d2",
          padding: "6px 12px",
          borderRadius: 6,
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Suggest an edit
      </button>
    </article>
  );
}

export default function SessionsDirectory() {
  const [dayFilter, setDayFilter] = useState<DayOfWeek | typeof ALL_DAYS>(ALL_DAYS);
  const [shuttleFilter, setShuttleFilter] = useState<ShuttleType | "all">("all");
  const [query, setQuery] = useState("");
  const [suggestFor, setSuggestFor] = useState<string | undefined>();
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return badmintonSessions.filter((s) => {
      if (dayFilter !== ALL_DAYS && !s.days.includes(dayFilter)) return false;
      if (!shuttleMatches(shuttleFilter, s.shuttle)) return false;
      if (!q) return true;
      const blob = [s.name, s.venue, s.address, s.level, s.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [dayFilter, shuttleFilter, query]);

  const grouped = useMemo(() => {
    const map = new Map<DayOfWeek, typeof filtered>();
    for (const day of DAY_ORDER) {
      map.set(day, []);
    }
    for (const session of filtered) {
      for (const day of session.days) {
        map.get(day)?.push(session);
      }
    }
    return DAY_ORDER.map((day) => ({
      day,
      sessions: map.get(day) ?? [],
    })).filter((g) => g.sessions.length > 0);
  }, [filtered]);

  function scrollToForm(name?: string) {
    setSuggestFor(name);
    setShowForm(true);
    requestAnimationFrame(() => {
      document.getElementById("sessions-feedback")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  const filterRow = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 12,
    justifyContent: "center",
    marginBottom: 20,
  };

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "0 16px 32px",
        textAlign: "left",
      }}
    >
      <div
        style={{
          background: "#f9f9f9",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginBottom: 24,
        }}
      >
        <h1 style={{ textAlign: "center", color: "#1a237e", marginTop: 0 }}>
          Portsmouth area badminton sessions
        </h1>
        <p style={{ textAlign: "center", color: "#424242", lineHeight: 1.6, maxWidth: 720, margin: "0 auto" }}>
          Turn-up-and-play and social sessions within roughly 25 miles of Portsmouth — especially
          improver and intermediate friendly. Times and prices change; always confirm with the club.
          Shuttle type is rarely published — entries marked plastic or feather are confirmed where
          we could verify.
        </p>
        <p style={{ textAlign: "center", marginTop: 12 }}>
          <a
            href={buildSessionsMailto({ to: SESSIONS_CONTACT_EMAIL })}
            style={{ fontWeight: 600 }}
          >
            Email {SESSIONS_CONTACT_EMAIL}
          </a>{" "}
          with updates anytime.
        </p>
      </div>

      <div style={filterRow}>
        <label>
          <span style={{ fontWeight: 600, marginRight: 8 }}>Day</span>
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value as DayOfWeek | typeof ALL_DAYS)}
            style={{ padding: "8px 10px", borderRadius: 8, fontSize: 15 }}
          >
            <option value={ALL_DAYS}>{ALL_DAYS}</option>
            {DAY_ORDER.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ fontWeight: 600, marginRight: 8 }}>Shuttles</span>
          <select
            value={shuttleFilter}
            onChange={(e) => setShuttleFilter(e.target.value as ShuttleType | "all")}
            style={{ padding: "8px 10px", borderRadius: 8, fontSize: 15 }}
          >
            <option value="all">All</option>
            <option value="plastic">Plastic & No Strings</option>
            <option value="feather">Feather only</option>
            <option value="unknown">Not stated</option>
          </select>
        </label>
        <label style={{ flex: "1 1 220px", maxWidth: 360 }}>
          <span style={{ fontWeight: 600, marginRight: 8 }}>Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Venue, town, club name…"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 15,
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <p style={{ textAlign: "center", color: "#616161", marginBottom: 24 }}>
        Showing {filtered.length} session listing{filtered.length === 1 ? "" : "s"}
      </p>

      {grouped.length === 0 ? (
        <p style={{ textAlign: "center" }}>No sessions match your filters.</p>
      ) : (
        grouped.map(({ day, sessions }) => (
          <section key={day} style={{ marginBottom: 32 }}>
            <h2
              style={{
                color: "#388e3c",
                borderBottom: "2px solid #c8e6c9",
                paddingBottom: 6,
                marginBottom: 16,
              }}
            >
              {day}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {sessions.map((session) => (
                <SessionCard key={`${day}-${session.id}`} session={session} onSuggest={scrollToForm} />
              ))}
            </div>
          </section>
        ))
      )}

      <div id="sessions-feedback" style={{ marginTop: 40 }}>
        {!showForm ? (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => scrollToForm(undefined)}
              style={{
                background: "#388e3c",
                color: "#fff",
                border: "none",
                padding: "14px 24px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Report a change or add a session
            </button>
          </div>
        ) : (
          <SuggestChangeForm sessionName={suggestFor} />
        )}
      </div>
    </div>
  );
}

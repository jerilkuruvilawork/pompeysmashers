import { useMemo, useState } from "react";
import {
  badmintonSessions,
  DAY_ORDER,
  SHUTTLE_LABELS,
  type DayOfWeek,
  type ShuttleType,
} from "../data/sessions";
import SuggestChangeForm from "./SuggestChangeForm";
import { buildSessionsMailto } from "../utils/mailto";
import { SESSIONS_CONTACT_EMAIL } from "../config";

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
  return (
    <article className={`session-card${session.unconfirmed ? " session-card--warn" : ""}`}>
      <header className="session-card__header">
        <h3>{session.name}</h3>
        <span className={`shuttle-badge shuttle-badge--${session.shuttle}`}>
          {SHUTTLE_LABELS[session.shuttle]}
        </span>
      </header>
      <p className="session-card__time">{session.time}</p>
      <p className="session-card__venue">
        {session.venue}
        <br />
        {session.address}
      </p>
      <dl className="session-card__meta">
        <div>
          <dt>Level</dt>
          <dd>{session.level}</dd>
        </div>
        {session.price && (
          <div>
            <dt>Price</dt>
            <dd>{session.price}</dd>
          </div>
        )}
      </dl>
      {session.shuttleNote && <p className="session-card__shuttle-note">{session.shuttleNote}</p>}
      {(session.contact || session.phone || session.email) && (
        <p className="session-card__contact">
          {session.contact && <span>{session.contact} </span>}
          {session.phone && (
            <a href={`tel:${session.phone.replace(/\s/g, "")}`}>{session.phone}</a>
          )}
          {session.email && <a href={`mailto:${session.email}`}>{session.email}</a>}
        </p>
      )}
      {session.link && (
        <p>
          <a href={session.link} target="_blank" rel="noopener noreferrer">
            More info
          </a>
        </p>
      )}
      {session.notes && <p className="session-card__notes">{session.notes}</p>}
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => onSuggest(session.name)}>
        Suggest an edit
      </button>
    </article>
  );
}

export default function SessionList() {
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
      const blob = [s.name, s.venue, s.address, s.level, s.notes].filter(Boolean).join(" ").toLowerCase();
      return blob.includes(q);
    });
  }, [dayFilter, shuttleFilter, query]);

  const grouped = useMemo(() => {
    const map = new Map<DayOfWeek, typeof filtered>();
    for (const day of DAY_ORDER) map.set(day, []);
    for (const session of filtered) {
      for (const day of session.days) {
        map.get(day)?.push(session);
      }
    }
    return DAY_ORDER.map((day) => ({ day, sessions: map.get(day) ?? [] })).filter(
      (g) => g.sessions.length > 0,
    );
  }, [filtered]);

  function openFeedback(name?: string) {
    setSuggestFor(name);
    setShowForm(true);
    requestAnimationFrame(() => {
      document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <>
      <section className="filters" aria-label="Filter sessions">
        <label>
          Day
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value as DayOfWeek | typeof ALL_DAYS)}
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
          Shuttles
          <select
            value={shuttleFilter}
            onChange={(e) => setShuttleFilter(e.target.value as ShuttleType | "all")}
          >
            <option value="all">All</option>
            <option value="plastic">Plastic &amp; No Strings</option>
            <option value="feather">Feather only</option>
            <option value="unknown">Not stated</option>
          </select>
        </label>
        <label className="filters__search">
          Search
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Venue, town, club…"
          />
        </label>
      </section>

      <p className="results-count">
        {filtered.length} listing{filtered.length === 1 ? "" : "s"} ·{" "}
        <a href={buildSessionsMailto({ to: SESSIONS_CONTACT_EMAIL })}>Email a correction</a>
      </p>

      {grouped.length === 0 ? (
        <p className="empty">No sessions match your filters.</p>
      ) : (
        grouped.map(({ day, sessions }) => (
          <section key={day} className="day-group">
            <h2>{day}</h2>
            <div className="session-grid">
              {sessions.map((session) => (
                <SessionCard
                  key={`${day}-${session.id}`}
                  session={session}
                  onSuggest={openFeedback}
                />
              ))}
            </div>
          </section>
        ))
      )}

      <section id="feedback" className="feedback">
        {!showForm ? (
          <button type="button" className="btn btn--accent btn--lg" onClick={() => openFeedback()}>
            Report a change or add a session
          </button>
        ) : (
          <SuggestChangeForm sessionName={suggestFor} />
        )}
      </section>
    </>
  );
}

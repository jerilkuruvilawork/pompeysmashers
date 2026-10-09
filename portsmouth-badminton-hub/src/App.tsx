import SessionList from "./components/SessionList";
import { SESSIONS_CONTACT_EMAIL, SITE_NAME, SITE_TAGLINE } from "./config";

export default function App() {
  return (
    <div className="layout">
      <header className="hero">
        <div className="hero__badge" aria-hidden>
          🏸
        </div>
        <h1>{SITE_NAME}</h1>
        <p className="hero__tagline">{SITE_TAGLINE}</p>
        <p className="hero__note">
          Turn-up-and-play and social sessions — especially improver and intermediate friendly.
          Times change; confirm with each club. Shuttle type is rarely published; ask before you
          travel.
        </p>
        <p className="hero__contact">
          Wrong info?{" "}
          <a href={`mailto:${SESSIONS_CONTACT_EMAIL}`}>{SESSIONS_CONTACT_EMAIL}</a>
        </p>
      </header>

      <main>
        <SessionList />
      </main>

      <footer className="site-footer">
        <p>
          {SITE_NAME} — community-maintained, not affiliated with any single club.
        </p>
      </footer>
    </div>
  );
}

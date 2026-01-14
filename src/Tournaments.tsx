function Tournaments() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, background: "#f9f9f9", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h1 style={{ textAlign: "center", color: "#1a237e" }}>Tournaments</h1>
      <p style={{ textAlign: "center", fontWeight: 500 }}>Check out our upcoming and past tournaments!</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#388e3c", borderBottom: "1px solid #c8e6c9", paddingBottom: 4 }}>Upcoming Tournaments</h2>
        <ul style={{ listStyle: "disc inside", marginLeft: 0, paddingLeft: 16 }}>
          <li><strong>Pompey Local</strong> <span style={{ color: "#616161" }}>– March 28th, 2026</span></li>
          <li><strong>Pompey Annual</strong> <span style={{ color: "#616161" }}>– November 28th, 2026</span></li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: "#1976d2", borderBottom: "1px solid #bbdefb", paddingBottom: 4 }}>Past Tournaments</h2>
        <ul style={{ listStyle: "none", marginLeft: 0, paddingLeft: 0 }}>
          <li style={{ marginBottom: 24 }}>
            <strong>Pompey Annual</strong> <span style={{ color: "#616161" }}>– November 29th, 2025</span>
              <li>1st: Antony/Shybin</li>
              <li>2nd: Afees/Nikhil</li>
              <li>3rd: Antony/Jobin</li>
              <li>4th: Anchal/Tony</li>
          </li>
          <li style={{ marginBottom: 24 }}>
            <strong>Pompey Local</strong> <span style={{ color: "#616161" }}>– November 29th, 2025</span>
              <li>1st: Baiju/Raju</li>
              <li>2nd: Saji/Sijo</li>
          </li>
          <li style={{ marginBottom: 24 }}>
            <strong>Pompey Annual</strong> <span style={{ color: "#616161" }}>– December 5th, 2024</span>
              <li>1st: Prasanna/Albert</li>
              <li>2nd: Abhi/Jomon</li>
          </li>
          <li style={{ marginBottom: 24 }}>
            <strong>Pompey Annual</strong> <span style={{ color: "#616161" }}>– December 5th, 2023</span>
              <li>1st: Joseph/Shameer</li>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Tournaments
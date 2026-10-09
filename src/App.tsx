import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Tournaments from './Tournaments'
import Contacts from './Contacts'
import SessionsDirectory from './SessionsDirectory'
import './App.css'
import logo from './assets/pompey.jpeg'
import { SITE_BASENAME } from './config'

function App() {
  return (
    <Router basename={SITE_BASENAME}>
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="Pompey Smashers Logo" style={{ maxWidth: 200, marginBottom: 20 }} />
        <nav style={{ marginBottom: 20, display: "flex", justifyContent: "center", gap: 16 }}>
          <Link to="/" style={{ padding: "8px 16px", borderRadius: 6, textDecoration: "none", background: "#1976d2", color: "#fff", fontWeight: "bold" }}>
            Home
          </Link>
          <Link to="/tournaments" style={{ padding: "8px 16px", borderRadius: 6, textDecoration: "none", background: "#388e3c", color: "#fff", fontWeight: "bold" }}>
            Tournaments
          </Link>
          <Link to="/contacts" style={{ padding: "8px 16px", borderRadius: 6, textDecoration: "none", background: "#25D366", color: "#fff", fontWeight: "bold" }}>
            Contacts
          </Link>
          <Link to="/sessions" style={{ padding: "8px 16px", borderRadius: 6, textDecoration: "none", background: "#5e35b1", color: "#fff", fontWeight: "bold" }}>
            Area sessions
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/sessions" element={<SessionsDirectory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
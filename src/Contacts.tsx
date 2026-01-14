function Contacts() {
  const contacts = [
    {
      name: "Antony",
      phone: "+44 1234 567890",
      whatsapp: "441234567890",
    },
    {
      name: "Jobin",
      phone: "+44 7987 654321",
      whatsapp: "447987654321",
    },
    {
      name: "Shefley",
      phone: "+44 7987 654321",
      whatsapp: "447987654321",
    },
    {
      name: "Jeril",
      phone: "+44 7987 654321",
      whatsapp: "447987654321",
    },
    {
      name: "Dipu",
      phone: "+44 7987 654321",
      whatsapp: "447987654321",
    }
  ];

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24, background: "#f9f9f9", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h1 style={{ textAlign: "center", color: "#1a237e" }}>Contact Us</h1>
      <ul style={{ listStyle: "none", padding: 0, fontSize: 18 }}>
        {contacts.map((c) => (
          <li key={c.name} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: "bold", minWidth: 80 }}>{c.name}</span>
              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 2,
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                WhatsApp
              </a>
              <a
                href={`tel:${c.phone.replace(/\s+/g, "")}`}
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                Call
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts
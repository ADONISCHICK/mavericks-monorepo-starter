// client/src/app/contact/page.tsx
export const metadata = { title: "Contact — Mavericks" };

export default function ContactPage() {
  const addr =
    "The Bristol Office, 2nd Floor, 5 High Street, Westbury-On-Trym, Bristol, England, BS9 3BY";
  const mail = "admin@themavericksgroup.co.uk";
  const mapQ = encodeURIComponent(addr);
  const mapSrc = `https://www.google.com/maps?q=${mapQ}&output=embed`;

  return (
    <section className="mxk-section">
      <div className="mxk-container grid gap-14 lg:grid-cols-2">
        <div>
          <h1>Contact Mavericks</h1>
          <p className="opacity-85">
            We’d love to hear from you. Reach out for partnerships, support or press.
          </p>

          <div className="rounded-xl p-4" style={{ background: "var(--mxk-panel)", border: "1px solid rgba(140,180,230,.16)" }}>
            <p><strong>Address</strong><br />{addr}</p>
            <p style={{ marginTop: 10 }}>
              <strong>Email</strong><br />
              <a className="mxk-link" href={`mailto:${mail}`}>{mail}</a>
            </p>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(140,180,230,.16)" }}>
          <iframe
            title="Mavericks Location"
            src={mapSrc}
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

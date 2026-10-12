export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="content-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-title">EasyWindmill</h3>
            <p className="footer-desc">
              An educational project dedicated to clear, accessible explanations of wind energy and turbine engineering.
            </p>
          </div>

          <ul className="footer-nav" aria-label="Footer links">
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onNavigate('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onNavigate('learn')}
              >
                Learn
              </button>
            </li>
            <li>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onNavigate('about')}
              >
                About
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EasyWindmill. Educational project.</p>
        </div>
      </div>
    </footer>
  );
}

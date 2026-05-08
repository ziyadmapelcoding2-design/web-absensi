import ThemeToggle from './ThemeToggle.jsx';

function DashboardShell({ eyebrow, title, subtitle, theme, onThemeToggle, action, children }) {
  return (
    <main className="page-card dashboard-shell">
      <div className="page-header">
        <div className="header-copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="header-actions">
          {onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
          {action}
        </div>
      </div>
      {children}
    </main>
  );
}

export default DashboardShell;

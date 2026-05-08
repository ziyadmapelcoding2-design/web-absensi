function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="btn btn-secondary theme-toggle" type="button" onClick={onToggle}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;

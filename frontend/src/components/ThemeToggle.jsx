function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label={`Ubah tema ke ${theme === 'light' ? 'gelap' : 'terang'}`} title={`Ubah ke tema ${theme === 'light' ? 'gelap' : 'terang'}`}>
      <span className="material-symbols-outlined theme-icon">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
    </button>
  );
}

export default ThemeToggle;

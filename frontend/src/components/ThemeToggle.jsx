function ThemeToggle({ theme, onToggle }) {
  return (
    <button 
      type="button" 
      className="theme-toggle" 
      onClick={onToggle} 
      aria-label={`Ubah tema ke ${theme === 'light' ? 'gelap' : 'terang'}`} 
      title={`Ubah ke tema ${theme === 'light' ? 'gelap' : 'terang'}`}
    >
      {/* Di bawah ini logikanya sudah ditukar: jika light, tampilkan light_mode */}
      <span className="material-symbols-outlined theme-icon">
        {theme === 'light' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}

export default ThemeToggle;
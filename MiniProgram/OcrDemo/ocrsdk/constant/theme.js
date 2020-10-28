const THEME_ENUM = {
  primary: 'primary',
  native: 'native',
};

function themeToRGB(theme) {
  const map = {
    [THEME_ENUM.primary]: '#006EFF',
    [THEME_ENUM.native]: '#07C160',
  };
  return map[theme];
}

function themeToSeal(theme) {
  const map = {
    [THEME_ENUM.primary]: 'primary',
    [THEME_ENUM.native]: 'success',
  };
  return map[theme];
}

function getTheme(theme) {
  return THEME_ENUM[theme] || THEME_ENUM.primary;
}

module.exports = {
  THEME_ENUM,
  themeToRGB,
  themeToSeal,
  getTheme,
};

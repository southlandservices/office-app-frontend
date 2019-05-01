const buttonLink = (theme) => {
  const buttonLinkStyle = Object.assign({}, {
    textDecoration: 'none',
    fontWeight: 500
  });
  return buttonLinkStyle;
}

const extendStyles = (theme, customStyles = {}) => {
  return Object.assign({}, customStyles, {
    buttonLink: buttonLink(theme)
  })
}

export default extendStyles;
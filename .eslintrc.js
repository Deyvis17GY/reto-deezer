module.exports = {
  parser: "@babel/eslint-parser",

  // añade "prettier" (y si quieres "prettier/react") a las opciones de "extends

  // y por ultimo, en la llave de "plugins" añade el plugin de eslint para prettier
  plugins: ["prettier"],
  extends: ["react-app", "plugin:prettier/recommended"]
}

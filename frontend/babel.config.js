module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "> 1%", "maintained node versions"]
        },
        modules: false // Important: Keep this as false to enable tree-shaking
      }
    ],
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-proposal-object-rest-spread"]
};

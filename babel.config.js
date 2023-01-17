module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "styled-jsx": {
          "plugins": ["styled-jsx-plugin-stylus"]
        }
      }
    ]
  ],
  "plugins": [
    "transform-react-pug",
    "transform-react-jsx"
  ]
}
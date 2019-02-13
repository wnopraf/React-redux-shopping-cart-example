 module.exports = {
  presets: [
    ['@babel/env', { targets: {
      node: 'current'
    }
  }], '@babel/react'
  ],
  plugins: [
    ['styled-jsx/babel', {plugins: ['styled-jsx-plugin-sass']}]
  ]
}

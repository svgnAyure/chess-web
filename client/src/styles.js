/**
 * Inneholder globale stildefinisjoner (CSS).
 */

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  body {
    background: #eee;
    margin: 0;
  }
`

export default GlobalStyle

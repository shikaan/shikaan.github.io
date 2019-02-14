import {createGlobalStyle} from "styled-components";

import {document} from './document'
import {reset} from './reset'

export default createGlobalStyle`
  ${reset}
  ${document}
  `

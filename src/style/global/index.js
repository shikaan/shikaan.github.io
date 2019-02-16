import { createGlobalStyle } from 'styled-components'

import { document } from './document'
import { reset } from './reset'
import { iconFont } from './icon-font'

export default createGlobalStyle`
  ${reset}
  ${document}
  ${iconFont}
  `

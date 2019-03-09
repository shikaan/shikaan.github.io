import styled from 'styled-components'

export default styled.hr(({ theme }) => `
  height: 1px;
  color: ${theme.color.lightGrey};
  margin-block-end: 0;
  margin-block-start: 0;
`)

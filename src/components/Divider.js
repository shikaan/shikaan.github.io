import styled from "styled-components";

const Divider = styled.hr(({theme}) => `
  height: 1px;
  color: ${theme.color.dark100};
  margin-block-end: 0;
  margin-block-start: 0;
`);

export default Divider;

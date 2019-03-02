import React from 'react';

const Form = ({children, className, onSubmit}) => (
  <form onSubmit={onSubmit} className={className}>
    {children}
  </form>
)

export default Form;

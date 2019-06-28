import React from 'react';
import Loading from './Loading';

const withLoading = Component => ({ isLoading, children, ...rest }) => (isLoading
  ? <Component {...rest}><Loading /></Component>
  : <Component {...rest}>{children}</Component>);

export default withLoading;

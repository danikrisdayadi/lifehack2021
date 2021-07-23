import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (children) => (
  <Container fluid>{children}</Container>
);

export default Layout;

// 404 error page

import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default class NotFound extends React.Component {
  render() {
    return (
      <>
        <br></br>
        <Row>
          <Col>
            <h1>Whoopsie!</h1>
            <h2>How did you get here?</h2>{' '}
          </Col>
          <Col>
            <h1>404</h1>
            <h2>Page not found</h2>
          </Col>
        </Row>
      </>
    );
  }
}

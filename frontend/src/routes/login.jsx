import { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../data/UserContext';

export default function Login() {
  const userCtx = useContext(UserContext);
  const { login } = userCtx;
  const [invalidLogin, setInvalidLogin] = useState(false);
  let navigate = useNavigate();

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setInvalidLogin(true);
    }
  };

  const invalidLoginMessage = (
    <p className='text-danger'>email or password is invalid</p>
  );

  return (
    <>
      <h1>Login</h1>
      <Row className='justify-content-md-center'>
        <Col xs lg='2'></Col>
        <Col md='6'>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>{' '}
            <Link to='/register'>
              <Button variant='secondary'>Register</Button>
            </Link>
            {invalidLogin && invalidLoginMessage}
          </Form>
        </Col>
        <Col xs lg='2'></Col>
      </Row>
    </>
  );
}

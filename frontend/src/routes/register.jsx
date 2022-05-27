import { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { UserContext } from '../data/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const userCtx = useContext(UserContext);
  const [validEmail, setValidEmail] = useState(true);

  let navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const user_name = e.target.formBasicUsername.value;
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;
    // check if email address is already in use

    // put user into DynamoDB
    const success = await userCtx.register(user_name, email, password);
    if (success) {
      // navigate to home
      navigate('/login');
    } else {
      setValidEmail(false);
    }
  };

  const inValidEmailMessage = (
    <p className='text-danger'>The email already exists</p>
  );

  return (
    <>
      <h1>Register</h1>
      <Row className='justify-content-md-center'>
        <Col xs lg='2'></Col>
        <Col md='6'>
          <Form onSubmit={register}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='user_name' placeholder='Enter username' />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Register
            </Button>
            {!validEmail && inValidEmailMessage}
          </Form>
        </Col>
        <Col xs lg='2'></Col>
      </Row>
    </>
  );
}

import { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../data/UserContext';

const UserComponent = () => {
  // get user from context
  const userContext = useContext(UserContext);
  const { user, loggedIn, logOut } = userContext;
  let navigate = useNavigate();
  // useEffect to watch for changes in loggedIn
  useEffect(() => {
    // set loggedIn state
    setLoggedInState(loggedIn);
  }, [loggedIn]);

  // add a state for loggedIn using the context
  const [loggedInState, setLoggedInState] = useState(loggedIn);
  const handleLogOut = () => {
    logOut();
    // redirect to login
    navigate('/login');
  };

  return (
    <>
      <Card bg='light' text='dark' className='text-center'>
        <Card.Header>User Information</Card.Header>
        <Card.Body>
          <Card.Text>
            {loggedInState ? (
              <span>Hello, {user.name}</span>
            ) : (
              // todo: username not working
              <span className='warning'>Please login!</span>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {loggedInState ? (
            <Button variant='primary' onClick={handleLogOut}>
              Logout
            </Button>
          ) : (
            <LinkContainer to='/login'>
              <Button variant='primary'>Login</Button>
            </LinkContainer>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default UserComponent;

// react-bootstrap navbar component with user authentication

import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../data/UserContext';

const NavBar = () => {
  // get user from context
  const userContext = useContext(UserContext);
  const { user, loggedIn, logOut } = userContext;
  const navigate = useNavigate();

  // useEffect to watch for changes in loggedIn
  useEffect(() => {
    // set loggedIn state
    setLoggedInState(loggedIn);
  }, [loggedIn]);

  // add a state for loggedIn using the context
  const [loggedInState, setLoggedInState] = useState(loggedIn);
  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          {/* <LinkContainer to="/"> */}
          {/* <Image src={radio} width="30" height="30" /> 
            TODO: PUT ANOTHER IMAGE HERE IF TIME*/}
          {/* </LinkContainer> */}
          <LinkContainer to='/'>
            <Navbar.Brand>LOL: Champion Manager</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {!loggedInState ? (
                <>
                  <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login' defaultChecked>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to='/'>
                  <Nav.Link> </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav pullright='true'>
              {loggedInState ? (
                <NavDropdown
                  eventkey={3}
                  title={user.name}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item onClick={handleLogOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link eventkey={3}>Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

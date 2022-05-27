import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';
import NavBar from '../components/nav/nav';
import { UserProvider } from '../data/UserContext';

export default function Layout() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </UserProvider>
    </>
  );
}

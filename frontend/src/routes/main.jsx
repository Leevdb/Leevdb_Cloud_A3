import { useContext } from 'react';
import UserComponent from '../components/user/user';
import { UserContext } from '../data/UserContext';
import ChampList from '../components/champion/champList';
import Subscription from '../components/user/subscribedChampions';

export default function Main() {
  const { loggedIn } = useContext(UserContext);

  return (
    <>
      <div className='jumbotron text-center'>
        <h1 className='display-1'>Welcome to Your LOL Champion Register!</h1>
        <h2 className='lead'>
          Your number 1 online champion register for League of Legends.
        </h2>
        <hr className='my-4' />
      </div>
      <UserComponent />
      <hr className='my-4' />
      {/*Subscriptions */}
      {/* below are how to hide/show components based on logged in true */}
      {/* if logged in show hello */}
      {loggedIn ? (
        <div className='jumbotron text-center'>
          <h3 className='display-1'>Hello!</h3>
          <h2 className='lead'>
            You are logged in. You can now access your account.
          </h2>
          <hr className='my-4' />
        </div>
      ) : (
        <div className='jumbotron text-center'>
          <h1 className='display-1'>Hello!</h1>
          <h2 className='lead'>
            You are not logged in. Please log in to access your account.
          </h2>
          <hr className='my-4' />
        </div>
      )}
      {loggedIn && <Subscription />}{' '}
      {/* if logged in show subscribed champions */}
      {loggedIn ? <ChampList /> : ''}{' '}
      {/* if logged in show full champion list */}
    </>
  );
}

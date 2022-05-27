// user context that uses DynamoDb login table
// also keeps track of user authentication and subscribed music
import { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_LOCAL;

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    authenticated: false,
    name: '',
  });
  // builds for user
  const [builds, setBuilds] = useState([]);
  // champs for user
  const [champs, setChamps] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const logOut = () => {
    setUser({
      authenticated: false,
      name: '',
    });
    // remove user from local storage
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const login = async (email, password) => {
    //login with email and password to api and get user data
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }

    //if data is successful, set user to data
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      setUser({
        authenticated: true,
        name: data.user.user_name,
      });
      setLoggedIn(true);
      console.log('user authenticated');
      // get builds
      // toast
      //   .promise(getBuilds(data.user.user_name), {
      //     pending: 'Getting builds...',
      //     success: {
      //       autoClose: 500,
      //       render() {
      //         return 'Subscribed builds successfully retrieved.';
      //       },
      //     },
      //     error: 'Error',
      //   });
      // get champs
      toast
        .promise(getChamps(data.user.user_name), {
          pending: 'Getting champions..',
          success: {
            autoClose: 500,
            render() {
              return 'Subscribed Champions successfully retrieved.';
            },
          },
          error: 'Error',
        })
        .then(() =>
          toast.success('Logged in successfully.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 500,
          })
        );
      return true;
    } else {
      console.log('sum ting wong');
      return false;
    }
  };

  //TODO: mirror this for heroes
  const getBuilds = async (username) => {
    const result = await fetch(`${API_URL}/build/${username}`);
    const data = await result.json();
    if (!result || result.length === 0) {
      setBuilds([]);
      return;
    }

    // for each song that is returned, query the music table and add song to the music array

    const buildArray = [];
    for (let i = 0; i < data.length; i++) {
      const build = data[i];
      const buildResult = await fetch(
        `${API_URL}/build/${username}/${build['champ-name']}`
      );
      if (buildResult) {
        buildArray.push(buildResult);
      }
    }
    setBuilds(buildArray);
  };

  //TODO: mirror this for heroes
  const getChamps = async (username) => {
    const result = await fetch(`${API_URL}/hero/user/${username}`);
    const data = await result.json();
    if (!data || data.length === 0) {
      setChamps([]);
      return;
    }
    // for each song that is returned, query the music table and add song to the music array

    const champArray = [];
    for (let i = 0; i < data.length; i++) {
      const champ = data[i];
      const champResult = await fetch(`${API_URL}/hero/${champ.champname}`);
      const champData = await champResult.json();
      if (champData) {
        champArray.push(champData);
      }
    }
    setChamps(champArray);
  };

  // check if email address is already in use
  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      setUser({
        authenticated: true,
        name: data.name,
      });
      setLoggedIn(true);
      console.log('user registered');
      return true;
    } else {
      console.log('sum ting wong');
      return false;
    }
  };

  useEffect(() => {
    // check if user is logged in
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')).user;
      setUser({
        authenticated: true,
        name: user.user_name,
      });
      getChamps(user.user_name);

      setLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        user,
        builds,
        champs,
        login,
        logOut,
        register,
        setChamps,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// The subscription area will show all the user subscribed champion information (title, artist, and year) stored in DynamoDB.
// Each champion information is followed by the corresponding artist image retrieved from S3 and a “Remove” button.
// If the user clicks a “Remove” button, the corresponding subscribed champion information and artist information will be removed from the subscription area and the corresponding table in DynamoDB.

import { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getChampionList } from '../../data/API.helper';
import { UserContext } from '../../data/UserContext';
import ChampItem from '../champion/champItem';

const Subscription = () => {
  const [champion, setChampion] = useState([]);
  const [loading, setLoading] = useState(true);

  // get user from context
  const { user, loggedIn, champs, setChamps } = useContext(UserContext);

  //  use useEffect watch for subscribedChamp
  useEffect(() => {
    if (champs) {
      setChampion(champs);
    }
  }, [champs]);

  // function to handle unsubscribing to the champ
  // this uses the deleteData method from the DynamoDB.jsx file
  // the Item is a composite of the champ title and the user's username
  const unsubscribeToChamp = async (champ) => {
    // check if user is logged in
    if (!loggedIn) {
      toast.error('You must be logged in to unsubscribe to a champ.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const champion = {
      username: user.name,
      championName: champ.name,
    };
    // remove the champ from the champion array
    const newChamps = champs.filter((champ) => {
      return champ.name !== champion.championName;
    });
    setChampion(newChamps);
    setChamps(newChamps);
    // remove from table using api
    await fetch(`${process.env.REACT_APP_API_LOCAL}/hero`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(champion),
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success('You have unsubscribed to this champion.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('There was an error unsubscribing to this champion.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error('There was an error unsubscribing to this champion.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className='subscription'>
      <h2 className='display-5'>Subscribed Champions</h2>
      <div className='subscription-container'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> </th>
              <th>Champion Name</th>
              <th>description</th>
              <th>lane</th>
              <th>role</th>
            </tr>
          </thead>
          <tbody>
            {champion.map((champ, index) => (
              <ChampItem
                key={index}
                champ={champ}
                unsubscribeToChamp={unsubscribeToChamp}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Subscription;

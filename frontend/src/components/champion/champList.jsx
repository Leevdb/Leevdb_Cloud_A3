import { useContext, useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UserContext } from '../../data/UserContext';
import { putData, getChampionList, subscribe } from '../../data/API.helper';
import ChampItem from './champItem';

const ChampList = () => {
  const [champList, setChampList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  // get user from context
  const { user, loggedIn, setChamps, champs } = useContext(UserContext);

  useEffect(() => {
    // getchampionList
    getChampionList()
      .then((data) => {
        setChampList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
        setIsLoading(false);
      });
  }, []);

  const subscribeToChamp = async (champ) => {
    // subscribe to champ
    await subscribe(champ.name, user.name)
      .then((data) => {
        toast.success(`You are now subscribed to ${champ.name}`);
        // add champ to subscribed champ array
        setChamps([...champs, champ]);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className='champList'>
      <h2 className='display-5'>ChampList</h2>
      {isError && !isLoading && (
        <div className='text-danger lead'>
          <p>{isError}</p>
        </div>
      )}

      {isLoading ? (
        <Spinner animation='border' role='status' />
      ) : (
        <>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> </th>
                <th>Name</th>
                <th>Description</th>
                <th>Lane</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {champList.map((champ, index) => (
                <ChampItem
                  key={index}
                  champ={champ}
                  subscribeToChamp={subscribeToChamp}
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ChampList;

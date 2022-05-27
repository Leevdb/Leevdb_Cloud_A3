import { useEffect, useState } from 'react';
import { Button, Image, Spinner } from 'react-bootstrap';
import { getImageUrl } from '../../data/API.helper';

const ChampItem = (props) => {
  // get the stuff from props
  const { index, champ, subscribeToChamp, unsubscribeToChamp } = props;
  // get the stuff from champ that came from props.

  const { name, description, imgname, lane, role } = champ;

  // useStates for image url and loading the image
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //get image url for from dynamoDB.jsx
    if (imgname) {
      getImageUrl(imgname).then((data) => {
        setImageUrl(data);
        setLoading(false);
      });
    }
  }, [imgname]);

  return (
    <tr key={index}>
      <td>
        {loading ? (
          <Spinner animation='border' variant='primary' />
        ) : (
          <Image src={imageUrl} alt={name} width={128} height={128} />
        )}
      </td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{lane}</td>
      <td>{role}</td>

      <td>
        {/* if subscribeToChamp is not null show it */}
        {subscribeToChamp ? (
          <Button
            variant='success'
            onClick={() => subscribeToChamp(champ)}
            disabled={loading}
          >
            Subscribe
          </Button>
        ) : (
          <Button
            variant='danger'
            onClick={() => unsubscribeToChamp(champ)}
            disabled={loading}
          >
            Remove
          </Button>
        )}
      </td>
    </tr>
  );
};

export default ChampItem;

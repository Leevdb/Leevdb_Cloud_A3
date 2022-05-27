import { Request, Response, Router } from 'express';
import { Champion, ChampionList } from '../model/models';
import { Key } from 'aws-sdk/clients/dynamodb';
import {
  deleteData,
  getAllData,
  getData,
  putData,
  queryTableIndexed,
} from '../helper/dynamo.helper';

const heroRouter = Router();

// get champions
// this will get all items from the database
heroRouter.get('/hero', async (req: Request, res: Response) => {
  //get all champions from dynamoDB item table
  const champions: Champion[] = (await getAllData('champion')) as Champion[];
  // if there are items, return them
  if (champions) {
    res.json(champions);
  }
  // if there are no items, return an error
  else {
    res.status(404).json({
      error: 'no champions found',
    });
  }
});

// get single champion
// this will get a single champion from the database
// the id is passed in the url as a parameter (e.g. /items/1)
// we access the id by using req.params.id (e.g. req.params.id)
// dont forget the id is a string, so we need to convert it to a number
heroRouter.get('/hero/:name', async (req, res) => {
  const champion: Champion = (await getData('champion', {
    name: req.params.name,
  })) as Champion;
  // if there is no item, return an error
  if (!champion) {
    res.status(404).json({
      error: 'no champion found',
    });
  }
  // if there is an item, return it
  else {
    res.json(champion);
  }
});

//get all champion for a user - THIS WORKS NOW
heroRouter.get('/hero/user/:user', async (req, res) => {
  // get user from query params
  const { user } = req.params;

  // query champ-list table with user_name
  const champions = await queryTableIndexed(
    'champ-list',
    'username-index',
    user as string
  );

  // if there are items, return them
  if (champions) {
    res.json(champions.Items);
  }
  // if there are no items, return an error
  else {
    res.status(404).json({
      error: 'no champions found for user',
    });
  }
});

// subscribe to champion
heroRouter.post('/hero', async (req, res) => {
  //get username from post request
  const username = req.body.username;
  //get champion name from post request
  const championName = req.body.championName;

  //if both fields blank error
  if (username === '' && championName === '') {
    res.status(400).json({
      error: 'username and championName fields are blank',
    });
  }
  //if username field blank error
  else if (username === '') {
    res.status(400).json({
      error: 'username field is blank',
    });
  }
  //if championName field blank error
  else if (championName === '') {
    res.status(400).json({
      error: 'championName field is blank',
    });
  }
  //if both fields present, add new entry to champ-list table in dynamoDB
  else {
    const championList: ChampionList = {
      username: username,
      champname: championName,
    };
    await putData('champ-list', championList);
    res.json({
      message: 'subscribed to champion',
    });
  }
});

// unsubscribe to champion
heroRouter.delete('/hero', async (req, res) => {
  //get username from post request
  const username = req.body.username;
  //get champion name from post request
  const championName = req.body.championName;

  //if both fields blank error
  if (username === '' && championName === '') {
    res.status(400).json({
      error: 'username and championName fields are blank',
    });
  }
  //if username field blank error
  else if (username === '') {
    res.status(400).json({
      error: 'username field is blank',
    });
  }
  //if championName field blank error
  else if (championName === '') {
    res.status(400).json({
      error: 'championName field is blank',
    });
  }
  //if both fields present, delete entry from champ-list table in dynamoDB
  else {
    const championList: Key = {
      username: username,
      champname: championName,
    };
    const result = await deleteData('champ-list', championList);
    res.json({
      message: 'unsubscribed to champion',
      detail: result,
    });
  }
});

export default heroRouter;

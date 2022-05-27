import { Request, Response, Router } from 'express';
import { Build } from '../model/models';
import { getAllData, getData, putData } from '../helper/dynamo.helper';

const buildRouter = Router();

// get champions
// this will get all items from the database
buildRouter.get('/build', async (req: Request, res: Response) => {
  //getall champions from dynamoDB item table
  const build: Build[] = (await getAllData('build')) as Build[];
  // if there are items, return them
  if (build) {
    res.json(build);
  }
  // if there are no items, return an error
  else {
    res.status(404).json({
      error: 'no builds found',
    });
  }
});

//get specific build for a user, using username and champname
buildRouter.get('/build/:user/:champ', async (req, res) => {
  const builds: Build[] = (await getData('build', {
    username: req.params.user,
    'champ-name': req.params.champ,
  })) as Build[];
  // if there is no item, return an error
  if (!builds) {
    res.status(404).json({
      error: 'no builds found for user',
    });
  }
  // if there is an item, return it
  else {
    res.json(builds);
  }
});

// get all builds for a user
buildRouter.get('/build/:user', async (req, res) => {
  const builds: Build[] = (await getAllData('build')) as Build[];
  // if there are items, return them
  if (builds) {
    // filter out all builds that dont match the username
    const filteredBuilds = builds.filter(
      (build) => build.username === req.params.user
    );
    if (filteredBuilds.length > 0) {
      res.json(filteredBuilds);
    } else {
      res.status(404).json({
        error: 'no builds found',
      });
    }
  }
  // if there are no items, return an error
  else {
    res.status(404).json({
      error: 'no builds found',
    });
  }
});

//post new build
buildRouter.post('/build', async (req, res) => {
  const { username, champion, item1, item2, item3, item4 } = req.body;
  //if all fields missing return error
  if (!username && !champion && !item1 && !item2 && !item3 && !item4) {
    res.status(400).json({
      error: 'missing fields',
    });
  }
  //if all fields present, create new build
  else {
    const build: Build = {
      username,
      champion,
      item1,
      item2,
      item3,
      item4,
    };
    const result = await putData('build', build);
    if (result) {
      console.log('build created');
      res.json(build);
    } else {
      console.log('build not created');
      res.status(500).json({
        error: 'build not created',
      });
    }
  }
});

export default buildRouter;

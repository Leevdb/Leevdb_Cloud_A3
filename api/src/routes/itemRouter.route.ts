import { Request, Response, Router } from 'express';
import { Item } from '../model/models';
import { getAllData, getData } from '../helper/dynamo.helper';
import { getUrl } from '../helper/s3.helper';

const itemRouter = Router();

// get items
// this will get all items from the database
itemRouter.get('/items', async (req: Request, res: Response) => {
  //getall items from dynamoDB item table
  const items: Item[] = (await getAllData('item')) as Item[];
  // if there are items, return them
  if (items) {
    res.json(items);
  }
  // if there are no items, return an error
  else {
    res.status(404).json({
      error: 'no items found',
    });
  }
});

// get item
// this will get a single item from the database
// the id is passed in the url as a parameter (e.g. /items/1)
// we access the id by using req.params.id (e.g. req.params.id)
// dont forget the id is a string, so we need to convert it to a number
itemRouter.get('/items/:name', async (req, res) => {
  const item: Item = (await getData('item', { name: req.params.name })) as Item;
  // if there is no item, return an error
  if (!item) {
    res.status(404).json({
      error: 'no item found',
    });
  }
  // if there is an item, return it
  else {
    res.json(item);
  }
});

// post request
// stores a item
itemRouter.post('/items', (req, res) => {
  res.send('items');
});

// put request
// updates a item
// id is the id of the item to update
// the id is in the url, so we can use req.params.id
// the body of the request is the new item data to update (eg. { name: "new name" })
// this is stored in req.body
itemRouter.put('/items/:id', (req, res) => {
  res.send('items');
});

// delete request
// deletes a item
// id comes from the url (e.g. /items/1)
// it is stored in the req.params object (e.g. req.params.id)
itemRouter.delete('/items/:id', (req, res) => {
  res.send('items');
});

itemRouter.get('/items/image/:filename', async (req, res) => {
  //get file url from  s3helper using filename
  try {
    const fileUrl = await getUrl(process.env.BUCKET!, req.params.filename);
    //if file url is not null, return file url
    if (fileUrl) {
      res.json(fileUrl);
    } else {
      res.status(404).json({
        error: 'no file found',
      });
    }
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

export default itemRouter;

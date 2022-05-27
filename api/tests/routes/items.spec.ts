// test the item end points
// this is where you can test the item end points and make sure they are working

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the better idea is to write the test FIRST and then write the code to make sure it works
// this is called TDD (Test Driven Development)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
import supertest from 'supertest';
import app from '../../src/server';
import * as db from '../../src/helper/dynamo.helper';
import { Item } from '../../src/model/models';

// create dummy item
const dummyItem: Item = {
  imgname: 'Aatrox',
  name: 'Aatrox',
  cost: 0,
  ad: 0,
  haste: 0,
  health: 0,
  armor: 0,
};

// spy on getAllData function and mock the aws ItemList response
jest.spyOn(db, 'getData').mockResolvedValue({
  Items: dummyItem,
});

// this mocks the app so we can test the routes
const request = supertest(app);

// describe what area we are testing
describe('items', () => {
  // describe the test we are going to run
  it('should return item', async () => {
    const response = await request.get('/items/Aatrox');
    expect(response.status).toBe(200);
    // eventually will return an array but at the moment we are just returning an empty object
    expect(response.body).toEqual({ Items: dummyItem });
  });
});

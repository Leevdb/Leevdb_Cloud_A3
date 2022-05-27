// test the hero end points
// this is where you can test the hero end points and make sure they are working

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the better idea is to write the test FIRST and then write the code to make sure it works
// this is called TDD (Test Driven Development)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
import supertest from 'supertest';
import app from '../../src/server';
import * as db from '../../src/helper/dynamo.helper';

// this mocks the app so we can test the routes
const request = supertest(app);

const dummyItem = {
  id: '1',
  name: 'Aatrox',
  title: 'the Darkin Blade',
  tags: ['Fighter', 'Assassin'],
  image:
    'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg',
  stats: {
    hp: 585,
    hpperlevel: 90,
    mp: 300,
    mpperlevel: 50,
    movespeed: 345,
    armor: 36,
    armorperlevel: 3.5,
    spellblock: 32.1,
    spellblockperlevel: 1.25,
    attackrange: 150,
    hpregen: 5.5,
    hpregenperlevel: 0.5,
    mpregen: 6,
    mpregenperlevel: 0.8,
    crit: 0,
    critperlevel: 0,
    attackdamage: 60,
    attackdamageperlevel: 3,
    attackspeedperlevel: 3.2,
    attackspeed: 0.625,
  },
};
// spy on getData function and mock the response
jest.spyOn(db, 'getData').mockResolvedValue({
  Items: [dummyItem],
});

// describe what area we are testing
describe('heroes', () => {
  // describe the test we are going to run
  it('should return a list of heroes', async () => {
    const response = await request.get('/hero');
    expect(response.status).toBe(200);
    // eventually will return an array but at the moment we are just returning an empty object
    expect(response.body).toEqual({ Items: [dummyItem] });
    // expect(response.body).toEqual([]);
  });
});

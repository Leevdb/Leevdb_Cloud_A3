// item model
export interface Item {
  imgname: string;
  name: string;
  cost: number;
  ad: number;
  haste: number;
  health: number;
  armor: number;
}

//champion model
export interface Champion {
  name: string;
  description: number;
  imgname: string;
  lane: string;
  role: string;
}

export interface Build {
  username: string;
  champion: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
}

export interface ChampionList {
  username: string;
  champname: string;
}

export interface User {
  username: string;
  password: string;
  email: string;
}

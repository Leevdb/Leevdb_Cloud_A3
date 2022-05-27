// functions to get and set DynamoDB data
import { createContext } from 'react';

const API_URL = process.env.REACT_APP_API_LOCAL;

export const DynamoDB = createContext();

export const getChampionList = async () => {
  // get champion list from api
  const response = await fetch(`${API_URL}/hero`);
  const data = await response.json();
  return data;
};

export const getChampion = async (name) => {
  // get champion from api
  const response = await fetch(`${API_URL}/hero/${name}`);
  const data = await response.json();
  return data;
};

export const putData = async (tableName, item) => {
  //undefined function
};

// subscribe to a champion
export const subscribe = async (championName, username) => {
  // subscribe to a champion
  const response = await fetch(`${API_URL}/hero`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ championName, username }),
  });
  const data = await response.json();
  return data;
};

export const getImageUrl = async (name) => {
  const response = await fetch(`${API_URL}/items/image/${name}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data;
};

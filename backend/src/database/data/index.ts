import { v4 } from 'uuid';
import { DishType } from '../entities';

function find<El extends { name: string }>(array: El[], name: string): El {
  const found = array.find((el) => el.name === name);

  if (typeof found === 'undefined') {
    throw new Error(`Cannot find item with name ${name}`);
  }

  return found;
}

export const dishes = [
  {
    id: v4(),
    name: 'Brooklyn beer IPA',
    type: DishType.BEVERAGE,
    price: 4.5,
    likes: 0,
  },
  {
    id: v4(),
    name: 'Cheesecake',
    type: DishType.DESSERT,
    price: 5,
    likes: 2,
  },
  {
    id: v4(),
    name: 'Coleslaw homemade',
    type: DishType.STARTER,
    price: 3,
    likes: 0,
  },
  {
    id: v4(),
    name: 'DUKE Burger',
    type: DishType.MAIN,
    price: 13.3,
    likes: 4,
  },
  {
    id: v4(),
    name: 'MOB Burger',
    type: DishType.MAIN,
    price: 11.5,
    likes: 6,
  },
];

export const ingredients = [
  { id: v4(), name: 'bacon' },
  { id: v4(), name: 'beaf' },
  { id: v4(), name: 'bread' },
  { id: v4(), name: 'cheddar' },
  { id: v4(), name: 'mustard' },
  { id: v4(), name: 'oignon' },
  { id: v4(), name: 'salade' },
  { id: v4(), name: 'tomato' },
  { id: v4(), name: "bleu d'auvergne" },
];

export const dishIngredients = [
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'bread') },
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'beaf') },
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'cheddar') },
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'salade') },
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'tomato') },
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'oignon') },
  { dish: find(dishes, 'MOB Burger'), ingredient: find(ingredients, 'mustard') },
  { dish: find(dishes, 'DUKE Burger'), ingredient: find(ingredients, 'bread') },
  { dish: find(dishes, 'DUKE Burger'), ingredient: find(ingredients, 'bacon') },
  { dish: find(dishes, 'DUKE Burger'), ingredient: find(ingredients, "bleu d'auvergne") },
  { dish: find(dishes, 'DUKE Burger'), ingredient: find(ingredients, 'salade') },
  { dish: find(dishes, 'DUKE Burger'), ingredient: find(ingredients, 'tomato') },
  { dish: find(dishes, 'DUKE Burger'), ingredient: find(ingredients, 'oignon') },
];

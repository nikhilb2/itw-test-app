export enum DishType {
  STARTER = 'starter',
  MAIN = 'main',
  DESSERT = 'dessert',
  BEVERAGE = 'beverage',
}

export type Ingredient = {
  id: string;
  name: string;
};

export type Dish = {
  dishType: DishType;
  id: string;
  ingredients: Array<Ingredient>;
  likes: number;
  name: string;
  price: number;
};

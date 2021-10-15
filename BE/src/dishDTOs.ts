import { v4 as uuidv4 } from 'uuid';

type DishType = 'starter' | 'main' | 'beverage' | 'dessert';

export class CreateDishDTO {
  dishName: string;
  dishType: DishType;
  price: number;
  likes: number;
}

export class DishDTO extends CreateDishDTO {
  dishId: string;
}
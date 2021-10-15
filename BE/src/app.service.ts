import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


// @Injectable()
// export class DishesService {
//   private readonly dishes: 
// }
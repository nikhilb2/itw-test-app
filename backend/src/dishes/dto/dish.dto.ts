import { applyDecorators } from '@nestjs/common';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { DishType } from '../../database/entities';

function IsOptionalNotNull() {
  return applyDecorators(IsOptional(), IsNotIn([null]));
}

function IsArrayOfUUIDs() {
  return applyDecorators(
    IsArray(),
    IsUUID(4, { each: true }),
    ArrayUnique((uuid) => uuid),
  );
}

export class DishParams {
  @IsUUID(4)
  id: string;
}

export class CreateDishDTO {
  @IsString()
  name: string;

  @IsEnum(DishType)
  dishType: DishType;

  @IsNumber()
  price: number;

  @IsNumber()
  likes: number;

  @IsArrayOfUUIDs()
  ingredientsIds: string[];
}

export class UpdateDishDTO {
  @IsOptionalNotNull()
  @IsString()
  name?: string;

  @IsOptionalNotNull()
  @IsEnum(DishType)
  dishType?: DishType;

  @IsOptionalNotNull()
  @IsNumber()
  price?: number;

  @IsOptionalNotNull()
  @IsNumber()
  likes?: number;

  @IsOptionalNotNull()
  @IsArrayOfUUIDs()
  ingredientsIds?: string[];
}

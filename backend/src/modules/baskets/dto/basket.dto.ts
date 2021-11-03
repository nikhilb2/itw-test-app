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

export class BasketParams {
  @IsUUID(4)
  id: string;
}

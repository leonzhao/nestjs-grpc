import { IsString, IsInt } from 'class-validator';
export class UpdateUserDto {
  @IsInt() readonly age: number;

  @IsString() readonly breed: string;
}

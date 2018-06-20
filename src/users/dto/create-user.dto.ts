import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class CreateUserDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty({ required: false })
  @IsInt()
  readonly age: number;

  @ApiModelProperty({ required: false })
  @IsString()
  readonly breed: string;
}

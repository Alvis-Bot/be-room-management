import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class RoomCategoryCreateDto{


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;
}
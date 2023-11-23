import { ApiProperty } from "@nestjs/swagger";


export class RoomCreateDto{


  @ApiProperty()
  name: string;

  // @ApiProperty()
  // roomCategoryId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: "string", format: "binary" , isArray: true})
  images: Express.Multer.File[];




}
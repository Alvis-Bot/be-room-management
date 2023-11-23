import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { Transform } from "class-transformer";

export class EventCreateDto{


  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
    // ngày bắt đầu
  date: Date;

  @ApiProperty()
    // ngày kết thúc
  startTime: Date;

  @ApiProperty()
    // ngày kết thúc
  endTime: Date;

  @ApiProperty()
    // địa điểm
  location: string;

  @ApiProperty()
  roomId: number;


  @ApiProperty()
    // số lượng người tham gia tối thiểu
  minParticipants: number;
}
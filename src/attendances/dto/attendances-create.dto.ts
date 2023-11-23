import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsIn, IsEnum } from "class-validator";
import { Type } from 'class-transformer';
import { AttendanceDetailStatus } from "../../common/entities/attendance-detail.entity";



export class AttendancesDetailsCreateDto {
  @ApiProperty()
  @IsNumber()
  readonly userId: number;
}

export class AttendancesCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ type: [AttendancesDetailsCreateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendancesDetailsCreateDto)
  readonly attendanceDetails: AttendancesDetailsCreateDto[];
}


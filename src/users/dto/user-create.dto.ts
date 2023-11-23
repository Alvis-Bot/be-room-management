import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EGenders } from "../../common/enum";


export class UserCreateDto{


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    studentCode: string;

    @IsNotEmpty()
    @IsEnum(EGenders)
    @ApiProperty({
        enum: EGenders,
    })
    gender: EGenders;
}
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomCreateDto } from "./dto/room-create.dto";
import { ApiFile, ApiFiles } from "../common/decorator/file.decorator";
import { MulterUtils, UploadTypesEnum } from "../common/utils/multer.utils";
import { Pagination } from "../common/pagination/pagination.dto";
import { ApiTags } from "@nestjs/swagger";
import { Note } from "../common/decorator/note.decorator";

@Controller('rooms')
@ApiTags("Rooms APIs")
export class RoomsController {

  constructor(
    private readonly roomsService: RoomsService
  ) {}


  @Post()
  @Note('Tạo mới phòng')
  @ApiFiles("image",  10 ,MulterUtils.getConfig(UploadTypesEnum.IMAGES))
  async createRoom(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto : RoomCreateDto
  ) {
    return await this.roomsService.createRoom(dto ,files);
  }

  @Get()
  @Note('Lấy danh sách phòng')
  async getRoomsPagination(
    @Query() pagination : Pagination,
  ) {
    return await this.roomsService.getRoomsPagination(pagination );
  }

  @Get('all')
  @Note('Lấy danh sách phòng')
  async getRooms() {
    return await this.roomsService.getRooms();
  }

  @Get(':id')
  @Note('Lấy chi tiết phòng')
  async getRoomById(
    @Param('id') id: number
  ) {
    return await this.roomsService.getRoomById(id);
  }


  @Delete()
  @Note('Xóa phòng')
  async deleteRoom(
    @Query("id") id: number
  ) {
    return await this.roomsService.deleteRoom(id);
  }



}

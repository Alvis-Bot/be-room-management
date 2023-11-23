import { Body, Controller, Get, Post } from "@nestjs/common";
import { RoomCategoriesService } from "./room-categories.service";
import { RoomCategoryCreateDto } from "./dto/room-category-create.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('room-categories')
@ApiTags("Room Categories APIs  (room-categories)")
export class RoomCategoriesController {

  constructor(
    private readonly roomCategoriesService: RoomCategoriesService
  ) {}

  @Post()
  async createRoomCategories(
    @Body() dto  : RoomCategoryCreateDto
  ) {
    return await this.roomCategoriesService.createRoomCategory(dto);
  }


  @Get()
  async getRoomCategories() {
    return await this.roomCategoriesService.getRoomCategories();
  }

}

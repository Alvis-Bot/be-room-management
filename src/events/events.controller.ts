import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { EventCreateDto } from "./dto/event-create.dto";
import { EventsService } from "./events.service";
import { Pagination } from "../common/pagination/pagination.dto";
import { ApiTags } from "@nestjs/swagger";
import { Note } from "../common/decorator/note.decorator";

@Controller("events")
@ApiTags("Events APIs")
export class EventsController {

  constructor(
    private readonly eventsService: EventsService
  ) {
  }


  @Post()
  @Note('Tạo mới sự kiện')
  async createEvent(
    @Body() dto: EventCreateDto
  ) {
    return await this.eventsService.createEvent(dto);
  }

  @Get()
  @Note('Lấy danh sách sự kiện')
  async getEvents(
    @Query() pagination: Pagination,
    @Query("roomId") roomId?: number
  ) {
    return await this.eventsService.getEvents(pagination ,roomId);
  }

  @Get(':id')
  @Note('Lấy chi tiết sự kiện')
  async getEventById(
    @Param('id') id: number
  ) {
    return await this.eventsService.getEventById(id);
  }
}

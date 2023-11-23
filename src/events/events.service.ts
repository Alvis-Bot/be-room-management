import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EventCreateDto } from "./dto/event-create.dto";
import { Event } from "../common/entities/event.entity";
import { Pagination } from "../common/pagination/pagination.dto";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { RoomsService } from "../rooms/rooms.service";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";

@Injectable()
export class EventsService {

  constructor(
     private readonly roomsService: RoomsService,
     @InjectRepository(Event)
     private eventRepository: Repository<Event>,
  ) {}

  async createEvent(dto: EventCreateDto) {
    const room = await this.roomsService.getRoomById(dto.roomId)
    const eventCreated = this.eventRepository.create({
        ...dto,
      room
    });
    return await this.eventRepository.save(eventCreated);
  }

  async getEvents(pagination: Pagination, roomId?: number) {
    const queryBuilder = this.eventRepository
      .createQueryBuilder("event")
      .skip(pagination.skip)
      .take(pagination.take)
      .leftJoinAndSelect("event.room", "room")
      // nếu không có roomId thì trả về tất cả các event
      .where(roomId ? "room.id = :roomId" : "1=1", { roomId })
      // nếu search không có thì lấy tất cả
      .andWhere('event.name like :search', { search: `%${pagination.search || ''}%` })
      .orderBy("event.createdAt", "DESC");


    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async getEventById(id: number) {
    const event = await this.eventRepository.findOne({
      where: {
        id
      },
      relations: ['room']
    });
    if (!event) {
      throw new ApiException(ErrorCode.EVENT_NOT_FOUND)
    }
    return event;

  }
}

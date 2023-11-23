import { Injectable } from '@nestjs/common';
import { RoomCreateDto } from "./dto/room-create.dto";
import { Room } from "../common/entities/room.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomCategoriesService } from "../room-categories/room-categories.service";
import { Pagination } from "../common/pagination/pagination.dto";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";

@Injectable()
export class RoomsService {

  constructor(
    private readonly roomCategoriesService: RoomCategoriesService,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ) {
  }
  async createRoom(dto: RoomCreateDto, files: Express.Multer.File[]) {
    // const roomCategory = await this.roomCategoriesService.getRoomCategoryById(dto.roomCategoryId);
    const room = this.roomRepository.create({
      ...dto,
      images: files.map(file => file.filename),
    });
    return await this.roomRepository.save(room);
  }

  async getRoomsPagination(pagination: Pagination) {
    const queryBuilder = this.roomRepository
      .createQueryBuilder("room")
      // .leftJoinAndSelect("room.roomCategory", "roomCategory")
      .skip(pagination.skip)
      .take(pagination.take)
      .where('room.name like :name', { name: `%${pagination.search || ''}%` })
      .orderBy("room.createdAt", "DESC");


    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async deleteRoom(id: number) {
     await this.roomRepository.delete(id);
      return {
        message: "Delete room successfully" ,
        id
      };

  }

  async getRoomById(id: number) {
    const room = await this.roomRepository.findOne({
      where: {
        id
      },
      // relations: ["roomCategory"]
    });
    if (!room) {
      throw new ApiException(ErrorCode.ROOM_NOT_FOUND)
    }
    return room;

  }

  async getRooms() {
    return await this.roomRepository.find();
  }
}

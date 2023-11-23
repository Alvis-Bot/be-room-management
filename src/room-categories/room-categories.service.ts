import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomCategory } from "../common/entities/room-category.entity";
import { Repository } from "typeorm";
import { RoomCategoryCreateDto } from "./dto/room-category-create.dto";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";

@Injectable()
export class RoomCategoriesService {


  constructor(
    @InjectRepository(RoomCategory)
    private readonly roomCategoryRepository: Repository<RoomCategory>
  ) {
  }


  async createRoomCategory(dto: RoomCategoryCreateDto) {
    const roomCategory = this.roomCategoryRepository.create({
      ...dto
    });
    return this.roomCategoryRepository.save(roomCategory);
  }

  async getRoomCategories() {
    return this.roomCategoryRepository.find({
      select: ["id", "name"]
    });
  }

  async getRoomCategoryById(id: number) {
    const roomCategory = await this.roomCategoryRepository.findOne({
      where: {
        id
      }
    });
    if (!roomCategory) {
      throw new ApiException(ErrorCode.ROOM_CATEGORY_NOT_FOUND);
    }

    return roomCategory;


  }
}

import { Module } from '@nestjs/common';
import { RoomCategoriesService } from './room-categories.service';
import { RoomCategoriesController } from './room-categories.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomCategory } from "../common/entities/room-category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomCategory])
  ],
  providers: [RoomCategoriesService],
  controllers: [RoomCategoriesController],
  exports: [RoomCategoriesService]
})
export class RoomCategoriesModule {}

import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "../common/entities/room.entity";
import { RoomCategoriesModule } from "../room-categories/room-categories.module";

@Module({
  imports: [
    RoomCategoriesModule,
    TypeOrmModule.forFeature([Room])
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService]
})
export class RoomsModule {}

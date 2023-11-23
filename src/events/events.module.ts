import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "../common/entities/event.entity";
import { RoomsModule } from "../rooms/rooms.module";

@Module({
  imports: [
    RoomsModule,
    TypeOrmModule.forFeature([Event])
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}

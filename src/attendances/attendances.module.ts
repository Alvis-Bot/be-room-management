import { Module } from '@nestjs/common';
import { AttendancesController } from './attendances.controller';
import { AttendancesService } from './attendances.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attendance } from "../common/entities/attendance.entity";
import { AttendanceDetail } from "../common/entities/attendance-detail.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Attendance , AttendanceDetail])
  ],
  controllers: [AttendancesController],
  providers: [AttendancesService]
})
export class AttendancesModule {}

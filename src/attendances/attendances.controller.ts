import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AttendancesService } from "./attendances.service";
import { AttendancesCreateDto } from "./dto/attendances-create.dto";
import { Attendance } from "../common/entities/attendance.entity";
import { Pagination } from "../common/pagination/pagination.dto";
import { AttendanceDetailStatus } from "../common/entities/attendance-detail.entity";
import { ApiTags } from "@nestjs/swagger";
import { Note } from "../common/decorator/note.decorator";

@Controller('attendances')
@ApiTags("Attendances APIs")
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService
  ) {}

  @Post()
  @Note('Tạo mới lịch điểm danh')
  async createAttendance(
    @Body() dto: AttendancesCreateDto
  ): Promise<Attendance> {
    return await this.attendancesService.createAttendance(dto);
  }

  @Get()
  @Note('Lấy danh sách lịch điểm danh')
  async getAll(
    @Query() pagination : Pagination,
    @Query("date") date?: string
  ) {
    return await this.attendancesService.getAttendances(pagination ,date);
  }

  @Get("/details")
  @Note('Lấy danh sách điểm danh chi tiết')
  async getAllDetails(
    @Query() pagination : Pagination,
    @Query("id") id?: number,
  ) {
    return await this.attendancesService.getAttendancesDetails(pagination ,id);
  }

  @Put('status')
  @Note('Cập nhật trạng thái điểm danh')
  async updateStatus(
    @Query('status') status: AttendanceDetailStatus,
    @Query("id") id: number
  ) {
    return await this.attendancesService.updateStatus(status, id);
  }

}

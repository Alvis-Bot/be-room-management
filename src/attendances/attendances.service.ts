import { Injectable } from "@nestjs/common";
import { Attendance } from "../common/entities/attendance.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Timestamp } from "typeorm";
import { AttendanceDetail, AttendanceDetailStatus } from "../common/entities/attendance-detail.entity";
import { AttendancesCreateDto } from "./dto/attendances-create.dto";
import { UsersService } from "../users/users.service";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { Pagination } from "../common/pagination/pagination.dto";
import { Meta } from "../common/pagination/meta.dto";
import { PaginationModel } from "../common/pagination/pagination.model";

@Injectable()
export class AttendancesService {


  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(AttendanceDetail)
    private readonly attendanceDetailRepository: Repository<AttendanceDetail>
  ) {
  }


  async create(attendance: Attendance): Promise<Attendance> {
    return await this.attendanceRepository.save(attendance);
  }

  async createAttendance(dto: AttendancesCreateDto) {

    const attendanceDetailCreated = await Promise.all(dto.attendanceDetails.map(async (user) => {
      const existUser = await this.usersService.getById(user.userId);
      const attendanceDetailCreated = this.attendanceDetailRepository.create({
        user: existUser
      });
      return await this.attendanceDetailRepository.save(attendanceDetailCreated);
    }));
    const attendanceCreated = this.attendanceRepository.create({
      attendanceDetails: attendanceDetailCreated,
      title: dto.title,
      description: dto.description,
    });
    return await this.attendanceRepository.save(attendanceCreated);
  }

  async getAttendances(pagination: Pagination, createdAt?: string) {
    console.log(createdAt);
    const queryBuilder = this.attendanceRepository
      .createQueryBuilder("attendance")
      .skip(pagination.skip)
      .take(pagination.take)
      .orderBy("attendance.createdAt", pagination.order)
      // nếu createdAt không có thì lấy tất cả
      .where(createdAt ? "attendance.createdAt = :createdAt" : "1=1", { createdAt });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async getAttendancesDetails(pagination: Pagination, id: number) {
    const queryBuilder = this.attendanceDetailRepository
      .createQueryBuilder("attendanceDetail")
      .leftJoin("attendanceDetail.attendance", "attendance")
      .leftJoinAndSelect("attendanceDetail.user", "user")
      .skip(pagination.skip)
      .take(pagination.take)
      .orderBy("attendanceDetail.createdAt", pagination.order)
      .where("attendance.id = :id", { id });
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel(entities, meta);
  }

  async getAttendancesDetailById(id: number) {
      const attendanceDetail = await this.attendanceDetailRepository.findOne({
        where: {
          id
        },
        relations: ["user"]
      })
      if (!attendanceDetail) {
        throw new ApiException(ErrorCode.ATTENDANCE_DETAIL_NOT_FOUND);
      }
    return attendanceDetail;
  }

  async updateStatus(status: AttendanceDetailStatus, id: number) {
    const attendanceDetail = await this.getAttendancesDetailById(id);
    attendanceDetail.status = status;
    return await this.attendanceDetailRepository.save(attendanceDetail);
  }
}

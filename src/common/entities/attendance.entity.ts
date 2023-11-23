import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { AttendanceDetail } from "./attendance-detail.entity";


@Entity("attendances")
export class Attendance extends AuditEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => AttendanceDetail, attendanceDetail => attendanceDetail.attendance)
  attendanceDetails: Relation<AttendanceDetail[]>;
}

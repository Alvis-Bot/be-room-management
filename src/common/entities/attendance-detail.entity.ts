import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { User } from "./user.entity";
import { Attendance } from "./attendance.entity";

export enum AttendanceDetailStatus {
  PRESENT = "PRESENT", // có mặt
  ABSENT = "ABSENT", // vắng mặt
  LATE = "LATE", // đến muộn
  LEAVE = "LEAVE", // về sớm
}
@Entity("attendance_details")
export class AttendanceDetail extends AuditEntity{

  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => User, user => user.attendanceDetails ,{
    nullable: true,
    onDelete: "CASCADE",
  } )
  user: Relation<User>;

  @Column({default: AttendanceDetailStatus.ABSENT , enum: AttendanceDetailStatus , type: "enum"})
  status: AttendanceDetailStatus;

  @ManyToOne(() => Attendance, attendance => attendance.attendanceDetails)
  attendance: Relation<Attendance>;


}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, ManyToOne } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { AttendanceDetail } from "./attendance-detail.entity";
import { EGenders } from "../enum";


export enum UserRole {
   'ADMIN' = 'ADMIN',
  'MANAGER' = 'MANAGER',
  'USER' = 'USER',
  // thực tập sinh
  'INTERN' = 'INTERN',
}
@Entity()
export class User extends AuditEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column({
    nullable: true,
  })
  email: string;


  @Column({
    nullable: true,
    unique: true,
  })
  studentCode: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: EGenders,
  })
  gender: EGenders;



  @Column({
    nullable: true,
    default: UserRole.USER,
    type: 'enum',
    enum: UserRole,
  })
  roles : UserRole;

  @Column()
  password: string;

  @Column({ default: false})
  isLocked: boolean;

  @OneToMany(() => AttendanceDetail, attendanceDetail => attendanceDetail.user ,{
    nullable: false,
    onDelete: 'CASCADE',
  })
  attendanceDetails: Relation<AttendanceDetail[]>;

}
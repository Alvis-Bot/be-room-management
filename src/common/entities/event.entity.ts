import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { EventStatus } from "../../events/event";
import { AuditEntity } from "./audit.entity";
import { Room } from "./room.entity";


@Entity("events")
export class Event extends AuditEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    // tên sự kiện
  name: string;

  @Column({
    type: "date",
    default: new Date()
  })
    // ngày sự kiện
  date: Date;


  @Column({

    type: "time",
  })
    // thời gian bắt đầu
   startTime: Date;

  @Column({
    type: "time",
  })
    // thời gian kết thúc
  endTime: Date;

  @Column()
    // địa điểm
  location: string;

  @Column()
    // số lượng người tham gia tối thiểu
  minParticipants: number;

  @Column({nullable: true})
    // tên người phụ trách
  description: string;

  @ManyToOne(() => Room, room => room.events)
  room: Relation<Room>

  @Column({default: EventStatus.UPCOMING , enum: EventStatus , type: "enum"})
    // trạng thái
  status: EventStatus;




}
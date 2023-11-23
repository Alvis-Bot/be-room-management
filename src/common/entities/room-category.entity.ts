import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { Room } from "./room.entity";

@Entity()
export class RoomCategory extends AuditEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  //
  // @OneToMany(() => Room, room => room.roomCategory)
  // rooms: Relation<Room[]>

}
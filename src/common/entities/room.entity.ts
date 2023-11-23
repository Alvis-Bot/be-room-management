import { Entity, Column, PrimaryGeneratedColumn, Relation, OneToMany } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { Event } from "./event.entity";

@Entity()
export class Room extends AuditEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  // số ghế
  quantity: number;

  @Column({ type: "text", array: true, nullable: true })
  images: string[]

  // @ManyToOne(() => RoomCategory, roomCategory => roomCategory.rooms)
  // @JoinColumn({ name: "roomCategoryId" })
  // roomCategory: Relation<RoomCategory>;

  @OneToMany(() => Event, event => event.room ,{
    cascade: true
  })
  events: Relation<Event[]>;

}
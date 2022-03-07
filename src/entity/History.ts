import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity('history')
export class History extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text', nullable: false})
  yearDate: number;  // ссылка

  @Column({type:'text', nullable: false})
  content: string;  // ссылка

  @Column({type:'text', nullable: true})
  subContent: string;  // ссылка

  @Column({type:'text', nullable: true})
  title: string;  // ссылка
}

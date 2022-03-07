import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity('hero')
export class Hero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text', nullable: false})
  content: string;  // ссылка

  @Column({type:'text', nullable: false})
  subContent: string;  // ссылка
}

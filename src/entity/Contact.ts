import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity('contact')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text', nullable: true})
  content: string;  // ссылка
}

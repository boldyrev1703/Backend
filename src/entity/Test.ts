import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity('test')
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text', nullable: true})
  login: string;  // логин

  @Column({type:'text', nullable: true})
  password: string;  // пароль
}

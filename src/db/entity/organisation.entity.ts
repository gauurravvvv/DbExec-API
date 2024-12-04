import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { User } from "./user.entity";
import { DatabaseE } from "./database.entity";

// Table: Organisation

@Entity()
export class Organisation extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ nullable: true })
  name!: string;

  @OneToMany(() => User, (user) => user.organisation)
  users: User[];

  @OneToMany(() => DatabaseE, (database) => database.organisation)
  databases: DatabaseE[];

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1,
  })
  status!: number;

  @VersionColumn({ select: false })
  version: number;

  @CreateDateColumn({ nullable: true })
  createdOn?: Date;

  @Column({ nullable: true, select: false })
  createdBy?: string;

  @UpdateDateColumn({ nullable: true, select: false })
  updatedOn?: Date;

  @Column({ nullable: true, select: false })
  updatedBy?: string;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedOn?: Date;

  @Column({ nullable: true, select: false })
  deletedBy?: string;
}

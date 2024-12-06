import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { DatabaseE } from "./database.entity";

@Entity()
export class DatabaseConfig extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @OneToOne(() => DatabaseE, (database) => database.config)
  database: DatabaseE;

  @Column({ nullable: false })
  hostname: string;

  @Column({ nullable: false })
  port: number;

  @Column({ nullable: false })
  dbName: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({
    type: "enum",
    enum: ["postgres", "mysql", "mssql", "oracle"],
    nullable: false,
    default: "postgres",
  })
  dbType: string;

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

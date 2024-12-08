import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  JoinColumn,
} from "typeorm";
import { Organisation } from "./organisation.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  get fullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column()
  email: string;

  @Column({ nullable: false })
  role: string;

  @Column({ nullable: true })
  organisationId: string;

  @ManyToOne(() => Organisation, (organisation) => organisation.users)
  @JoinColumn({ name: "organisationId" })
  organisation: Organisation;

  @Column({ nullable: false })
  organisationName: string;

  @Column()
  username: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({ nullable: false })
  permissions: string;

  @Column({ nullable: false, default: false })
  isFirstLogin: boolean;

  @Column({ type: "timestamptz", nullable: true })
  lastLogin: Date;

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 1,
  })
  status!: number;

  @Column({
    type: "enum",
    enum: [0, 1],
    default: 0,
  })
  isDefault!: number;

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

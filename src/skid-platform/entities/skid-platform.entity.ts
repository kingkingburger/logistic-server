import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { UldHistory } from '../../uld-history/entities/uld-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BuildUpOrder } from '../../build-up-order/entities/build-up-order.entity';
import { AsrsOutOrder } from '../../asrs-out-order/entities/asrs-out-order.entity';
import { SkidPlatformHistory } from '../../skid-platform-history/entities/skid-platform-history.entity';

@Entity()
export class SkidPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '안착대이름',
    description: '이름',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ApiProperty({
    example: 0,
    description: '부모 안착대',
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  parent: number;

  @ApiProperty({
    example: 0,
    description: '안착대 트리 레벨',
  })
  @Column({ type: 'int', nullable: false, default: 0 })
  level: number;

  @ApiProperty({
    example: '안착대 경로',
    description: '안착대 경로',
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  fullPath: string;

  @ApiProperty({
    example: 0,
    description: '순서',
  })
  @Column({ type: 'int', nullable: true })
  orderby: number;

  @ApiProperty({
    example: 1.0,
    description: 'x좌표',
  })
  @Column({ type: 'double precision', nullable: true })
  x: number;

  @ApiProperty({
    example: 1.0,
    description: 'y좌표',
  })
  @Column({ type: 'double precision', nullable: true })
  y: number;

  @ApiProperty({
    example: 1.0,
    description: 'z좌표',
  })
  @Column({ type: 'double precision', nullable: true })
  z: number;

  @ApiProperty({
    example: true,
    description: '시뮬레이션모드',
  })
  @Column({ type: 'boolean', nullable: true })
  simulation: boolean;

  @ApiProperty({
    example: false,
    description: '가상포트',
  })
  @Column({ type: 'boolean', nullable: true })
  virtual: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => BuildUpOrder, (buildUpOrder) => buildUpOrder.SkidPlatform)
  buildUpOrders: Relation<BuildUpOrder[]>;

  @OneToMany(() => AsrsOutOrder, (asrsOutOrder) => asrsOutOrder.SkidPlatform)
  asrsOutOrders: Relation<AsrsOutOrder[]>;

  @OneToMany(
    () => SkidPlatformHistory,
    (skidPlatformHistory) => skidPlatformHistory.SkidPlatform,
  )
  skidPlatformHistories: Relation<SkidPlatformHistory[]>;

  @OneToMany(() => UldHistory, (uldHistory) => uldHistory.BuildUpOrder)
  uldHistories: Relation<UldHistory[]>;
}

export const SkidPlatformAttribute = {
  id: true,
  name: true,
  parent: true,
  level: true,
  fullPath: true,
  orderby: true,
  x: true,
  y: true,
  z: true,
  simulation: true,
  createdAt: true,
};

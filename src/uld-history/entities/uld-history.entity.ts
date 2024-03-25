import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Uld } from '../../uld/entities/uld.entity';
import { Awb } from '../../awb/entities/awb.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BuildUpOrder } from '../../build-up-order/entities/build-up-order.entity';
import { SkidPlatform } from '../../skid-platform/entities/skid-platform.entity';
import { IsNumber, Min } from 'class-validator';

@Entity()
export class UldHistory {
  @PrimaryGeneratedColumn()
  id: number;

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
    example: 0,
    description: 'uld안의 피스수량, 해포화물인 경우에만 낱개수량 입력',
  })
  @Column({ type: 'int', nullable: true })
  pieceCount: number;

  @ApiProperty({
    example: true,
    description: '추천사용여부, (true:추천대로, false: 작업자 수동)',
  })
  @Column({ type: 'boolean', nullable: true })
  recommend: boolean;

  @ApiProperty({
    example: '작업자이름',
    description: '추천사용을 안했을 때만 입력',
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  worker: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ApiProperty({
    example: 1,
    description: '작업자 작업지시FK',
    type: () => BuildUpOrder,
  })
  @ManyToOne(() => BuildUpOrder, (buildUpOrder) => buildUpOrder.uldHistories)
  BuildUpOrder: Relation<BuildUpOrder> | number;

  @ApiProperty({
    example: 1,
    description: '안착대FK',
    type: () => SkidPlatform,
  })
  @ManyToOne(() => SkidPlatform, (skidPlatform) => skidPlatform.uldHistories)
  SkidPlatform: Relation<SkidPlatform> | number;

  @ApiProperty({
    example: 1,
    description: 'UldFK',
    type: () => Uld,
  })
  @IsNumber()
  @Min(1)
  @ManyToOne(() => Uld, (uld) => uld.uldHistories)
  Uld: Relation<Uld> | number;

  @ApiProperty({
    example: 1,
    description: 'AwbFK',
    type: () => Awb,
  })
  @IsNumber()
  @Min(1)
  @ManyToOne(() => Awb, (awb) => awb.uldHistories)
  Awb: Relation<Awb> | number;
}

export const UldHistoryAttribute = {
  id: true,
  x: true,
  y: true,
  z: true,
  pieceCount: true,
  recommend: true,
  worker: true,
  createdAt: true,
};

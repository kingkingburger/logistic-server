import { Module } from '@nestjs/common';
import { AwbGroupService } from './awb-group.service';
import { AwbGroupController } from './awb-group.controller';
import { AwbGroup } from './entities/awb-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwbService } from '../awb/awb.service';
import { Awb } from '../awb/entities/awb.entity';
import { Scc } from '../scc/entities/scc.entity';
import { AwbSccJoin } from '../awb-scc-join/entities/awb-scc-join.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MqttModule } from '../mqtt.module';
import { FileService } from '../file/file.service';
import { SccService } from '../scc/scc.service';
import { Vms3D } from '../vms/entities/vms.entity';
import { Vms2d } from '../vms2d/entities/vms2d.entity';
import { Basic } from '../basic/entities/basic.entity';
import { AwbUtilService } from '../awb/awbUtil.service';
import { VmsAwbResult } from '../vms-awb-result/entities/vms-awb-result.entity';
import { VmsAwbHistory } from '../vms-awb-history/entities/vms-awb-history.entity';
import { AircraftSchedule } from '../aircraft-schedule/entities/aircraft-schedule.entity';
import { SkidPlatformHistory } from '../skid-platform-history/entities/skid-platform-history.entity';
import { SkidPlatformHistoryService } from '../skid-platform-history/skid-platform-history.service';
import { AsrsOutOrder } from '../asrs-out-order/entities/asrs-out-order.entity';
import { RedisService } from '../redis/redis.service';
import { redisCustomProvider } from '../redis/redisCustomProvider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AwbGroup,
      Awb,
      AwbSccJoin,
      Scc,
      Basic,
      AircraftSchedule,
      AsrsOutOrder,
      SkidPlatformHistory,
    ]),
    TypeOrmModule.forFeature([Vms3D, Vms2d], 'mssqlDB'),
    TypeOrmModule.forFeature([VmsAwbResult, VmsAwbHistory], 'dimoaDB'),
    MulterModule.register({ dest: './upload' }),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [AwbGroupController],
  providers: [
    AwbGroupService,
    FileService,
    AwbService,
    SccService,
    AwbUtilService,
    SkidPlatformHistoryService,
    RedisService,
    ...redisCustomProvider,
  ],
})
export class AwbGroupModule {}

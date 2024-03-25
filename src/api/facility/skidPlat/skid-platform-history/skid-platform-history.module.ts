import { Module } from '@nestjs/common';
import { SkidPlatformHistoryService } from './skid-platform-history.service';
import { SkidPlatformHistoryController } from './skid-platform-history.controller';
import { SkidPlatformHistory } from './entities/skid-platform-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from '../../../../mqtt.module';
import { RedisService } from '../../../../redis/redis.service';
import { Awb } from '../../../cargo/awb/entities/awb.entity';
import { AwbService } from '../../../cargo/awb/awb.service';
import { Scc } from '../../../cargo/scc/entities/scc.entity';
import { Vms3D } from '../../vms/vms/entities/vms.entity';
import { Vms2d } from '../../vms/vms2d/entities/vms2d.entity';
import { VmsAwbResult } from '../../vms/vms-awb-result/entities/vms-awb-result.entity';
import { VmsAwbHistory } from '../../vms/vms-awb-history/entities/vms-awb-history.entity';
import { AwbUtilService } from '../../../cargo/awb/awbUtil.service';
import { AircraftSchedule } from '../../../flight/aircraft-schedule/entities/aircraft-schedule.entity';
import { redisCustomProvider } from '../../../../redis/redisCustomProvider';
import { FileService } from '../../../../file/file.service';
import { SccService } from '../../../cargo/scc/scc.service';
import { AwbSccJoin } from '../../../cargo/awb-scc-join/entities/awb-scc-join.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SkidPlatformHistory,
      Awb,
      Scc,
      AwbSccJoin,
      AircraftSchedule,
    ]),
    TypeOrmModule.forFeature([Vms3D, Vms2d], 'mssqlDB'),
    TypeOrmModule.forFeature([VmsAwbResult, VmsAwbHistory], 'dimoaDB'),
    MqttModule,
  ],
  controllers: [SkidPlatformHistoryController],
  providers: [
    SkidPlatformHistoryService,
    RedisService,
    ...redisCustomProvider,
    AwbService,
    FileService,
    SccService,
    AwbUtilService,
  ],
})
export class SkidPlatformHistoryModule {}

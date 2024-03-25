import { Module } from '@nestjs/common';
import { AwbService } from './awb.service';
import { AwbController } from './awb.controller';
import { Awb } from './entities/awb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwbSccJoin } from '../awb-scc-join/entities/awb-scc-join.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Scc } from '../scc/entities/scc.entity';
import { AsrsOutOrder } from '../../ps/asrs-out-order/entities/asrs-out-order.entity';
import { AircraftSchedule } from '../../flight/aircraft-schedule/entities/aircraft-schedule.entity';
import { SkidPlatformHistory } from '../../facility/skidPlat/skid-platform-history/entities/skid-platform-history.entity';
import { Alarm } from '../../alarm/entities/alarm.entity';
import { Vms3D } from '../../facility/vms/vms/entities/vms.entity';
import { Vms2d } from '../../facility/vms/vms2d/entities/vms2d.entity';
import { VmsAwbResult } from '../../facility/vms/vms-awb-result/entities/vms-awb-result.entity';
import { VmsAwbHistory } from '../../facility/vms/vms-awb-history/entities/vms-awb-history.entity';
import { MqttModule } from '../../../mqtt.module';
import { AwbUtilService } from './awbUtil.service';
import { FileService } from '../../../file/file.service';
import { MqttService } from '../../../mqtt.service';
import { SccService } from '../scc/scc.service';
import { SkidPlatformHistoryService } from '../../facility/skidPlat/skid-platform-history/skid-platform-history.service';
import { RedisService } from '../../../redis/redis.service';
import { redisCustomProvider } from '../../../redis/redisCustomProvider';
import { AlarmService } from '../../alarm/alarm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Awb,
      Scc,
      AwbSccJoin,
      AsrsOutOrder,
      AircraftSchedule,
      SkidPlatformHistory,
      Alarm,
    ]),
    TypeOrmModule.forFeature([Vms3D, Vms2d], 'mssqlDB'),
    TypeOrmModule.forFeature([VmsAwbResult, VmsAwbHistory], 'dimoaDB'),
    MulterModule.register({ dest: './upload' }),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [AwbController],
  providers: [
    AwbService,
    AwbUtilService,
    FileService,
    MqttService,
    SccService,
    SkidPlatformHistoryService,
    RedisService,
    ...redisCustomProvider,
    AlarmService,
  ],
})
export class AwbModule {}

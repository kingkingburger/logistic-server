import { Module } from '@nestjs/common';
import { AsrsService } from './asrs.service';
import { AsrsController } from './asrs.controller';
import { Asrs } from './entities/asrs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsrsHistory } from '../asrs-history/entities/asrs-history.entity';
import { MqttModule } from '../../../../mqtt.module';
import { TimeTable } from '../../../time-table/entities/time-table.entity';
import { SkidPlatformHistory } from '../../skidPlat/skid-platform-history/entities/skid-platform-history.entity';
import { AsrsOutOrder } from '../../../ps/asrs-out-order/entities/asrs-out-order.entity';
import { Awb } from '../../../cargo/awb/entities/awb.entity';
import { Scc } from '../../../cargo/scc/entities/scc.entity';
import { AwbSccJoin } from '../../../cargo/awb-scc-join/entities/awb-scc-join.entity';
import { AircraftSchedule } from '../../../flight/aircraft-schedule/entities/aircraft-schedule.entity';
import { Alarm } from '../../../alarm/entities/alarm.entity';
import { Vms3D } from '../../vms/vms/entities/vms.entity';
import { Vms2d } from '../../vms/vms2d/entities/vms2d.entity';
import { FileService } from '../../../../file/file.service';
import { MqttService } from '../../../../mqtt.service';
import { AwbService } from '../../../cargo/awb/awb.service';
import { SccService } from '../../../cargo/scc/scc.service';
import { AwbUtilService } from '../../../cargo/awb/awbUtil.service';
import { AlarmService } from '../../../alarm/alarm.service';
import { VmsAwbResult } from '../../vms/vms-awb-result/entities/vms-awb-result.entity';
import { VmsAwbHistory } from '../../vms/vms-awb-history/entities/vms-awb-history.entity';
import { MulterModule } from '@nestjs/platform-express';
import { SkidPlatformHistoryService } from '../../skidPlat/skid-platform-history/skid-platform-history.service';
import { RedisService } from '../../../../redis/redis.service';
import { redisCustomProvider } from '../../../../redis/redisCustomProvider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asrs,
      AsrsHistory,
      TimeTable,
      SkidPlatformHistory,
      AsrsOutOrder,
      Awb,
      Scc,
      AwbSccJoin,
      AircraftSchedule,
      Alarm,
    ]),
    TypeOrmModule.forFeature([Vms3D, Vms2d], 'mssqlDB'),
    TypeOrmModule.forFeature([VmsAwbResult, VmsAwbHistory], 'dimoaDB'),
    MulterModule.register({ dest: './upload' }),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [AsrsController],
  providers: [
    AsrsService,
    SkidPlatformHistoryService,
    RedisService,
    ...redisCustomProvider,
    FileService,
    MqttService,
    AwbService,
    SccService,
    AwbUtilService,
    AlarmService,
  ],
})
export class AsrsModule {}

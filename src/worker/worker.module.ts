import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from '../mqtt.module';
import { ConfigModule } from '@nestjs/config';
import {
  amrConfig,
  dimoaConfig,
  mssqlConfig,
  postgresConfig,
} from '../config/db.config';
import { ScheduleModule } from '@nestjs/schedule';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
import { RedisService } from '../redis/redis.service';
import { redisCustomProvider } from '../redis/redisCustomProvider';
import { Amr } from '../api/facility/amr/amr/entities/amr.entity';
import { AmrCharger } from '../api/facility/amr/amr-charger/entities/amr-charger.entity';
import { AmrChargeHistory } from '../api/facility/amr/amr-charge-history/entities/amr-charge-history.entity';
import { Hacs } from '../api/facility/amr/hacs/entities/hacs.entity';
import { HacsModule } from '../api/facility/amr/hacs/hacs.module';
import { AmrService } from '../api/facility/amr/amr/amr.service';
import { LoggerService } from '../lib/logger/logger.service';
import { Awb } from '../api/cargo/awb/entities/awb.entity';
import { Scc } from '../api/cargo/scc/entities/scc.entity';
import { AwbService } from '../api/cargo/awb/awb.service';
import { SccService } from '../api/cargo/scc/scc.service';
import { AwbUtilService } from '../api/cargo/awb/awbUtil.service';
import { VmsAwbResult } from '../api/facility/vms/vms-awb-result/entities/vms-awb-result.entity';
import { VmsAwbHistory } from '../api/facility/vms/vms-awb-history/entities/vms-awb-history.entity';
import { AircraftSchedule } from '../api/flight/aircraft-schedule/entities/aircraft-schedule.entity';
import { SkidPlatformHistory } from '../api/facility/skidPlat/skid-platform-history/entities/skid-platform-history.entity';
import { AsrsOutOrder } from '../api/ps/asrs-out-order/entities/asrs-out-order.entity';
import { Alarm } from '../api/alarm/entities/alarm.entity';
import { AlarmService } from '../api/alarm/alarm.service';
import { AwbSccJoin } from '../api/cargo/awb-scc-join/entities/awb-scc-join.entity';
import { Vms3D } from '../api/facility/vms/vms/entities/vms.entity';
import { Vms2d } from '../api/facility/vms/vms2d/entities/vms2d.entity';
import { SkidPlatformHistoryService } from '../api/facility/skidPlat/skid-platform-history/skid-platform-history.service';

@Module({
  imports: [
    //env 파일 사용
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용하기
    }),

    // PostgreSQL 연결 설정
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return postgresConfig;
      },
    }),

    // MSSQL 연결 설정
    TypeOrmModule.forRootAsync({
      name: 'mssqlDB',
      useFactory: async () => {
        return mssqlConfig;
      },
    }),

    // 디모아 연결 설정
    TypeOrmModule.forRootAsync({
      name: 'dimoaDB',
      useFactory: async () => {
        return dimoaConfig;
      },
    }),

    // amr업체 연결 설정
    TypeOrmModule.forRootAsync({
      name: 'amrDB',
      useFactory: async () => {
        return amrConfig;
      },
    }),

    // mqtt 모듈설정
    MqttModule,

    // schedule 모듈 설정
    ScheduleModule.forRoot(),

    // file 모듈 설정
    // FileModule,

    HacsModule,
    WorkerModule,
    TypeOrmModule.forFeature([
      Amr,
      AmrCharger,
      AmrChargeHistory,
      Awb,
      AwbSccJoin,
      Scc,
      AsrsOutOrder,
      AircraftSchedule,
      SkidPlatformHistory,
      Alarm,
    ]),
    TypeOrmModule.forFeature([Vms3D, Vms2d], 'mssqlDB'),
    TypeOrmModule.forFeature([VmsAwbResult, VmsAwbHistory], 'dimoaDB'),
    TypeOrmModule.forFeature([Hacs], 'amrDB'),
    MulterModule.register({ dest: './upload' }),
  ],
  providers: [
    WorkerService,
    AmrService,
    LoggerService,
    {
      provide: 'SERVICE_NAME', // 여기에서 프로바이더 이름을 지정합니다.
      useValue: 'WorkerService', // 원하는 값을 useValue로 지정합니다.
    },
    FileService,

    AwbService,
    AwbUtilService,
    SccService,
    SkidPlatformHistoryService,
    RedisService,
    ...redisCustomProvider,
    AlarmService,
  ],
})
export class WorkerModule {}

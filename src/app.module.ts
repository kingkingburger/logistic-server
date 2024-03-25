import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  amrConfig,
  dimoaConfig,
  mssqlConfig,
  postgresConfig,
} from './config/db.config';
import { RedisModule } from './redis/redis.module';
import { BasicModule } from './api/reference/basic/basic.module';
import { LoggerMiddleware } from './lib/logger/logger.middleware';
import { AmrModule } from './api/facility/amr/amr/amr.module';
import { AmrChargerModule } from './api/facility/amr/amr-charger/amr-charger.module';
import { AmrChargeHistoryModule } from './api/facility/amr/amr-charge-history/amr-charge-history.module';
import { AsrsModule } from './api/facility/asrs/asrs/asrs.module';
import { AwbModule } from './api/cargo/awb/awb.module';
import { AwbSccJoinModule } from './api/cargo/awb-scc-join/awb-scc-join.module';
import { SccModule } from './api/cargo/scc/scc.module';
import { UldModule } from './api/facility/uld/uld/uld.module';
import { UldHistoryModule } from './api/facility/uld/uld-history/uld-history.module';
import { UldSccJoinModule } from './api/facility/uld/uld-scc-join/uld-scc-join.module';
import { UldTypeModule } from './api/facility/uld/uld-type/uld-type.module';
import { AsrsOutOrderModule } from './api/ps/asrs-out-order/asrs-out-order.module';
import { BuildUpOrderModule } from './api/ps/build-up-order/build-up-order.module';
import { SkidPlatformModule } from './api/facility/skidPlat/skid-platform/skid-platform.module';
import { SkidPlatformHistoryModule } from './api/facility/skidPlat/skid-platform-history/skid-platform-history.module';
import { AsrsHistoryModule } from './api/facility/asrs/asrs-history/asrs-history.module';
import { SimulatorResultModule } from './api/ps/simulator-result/simulator-result.module';
import { SimulatorHistoryModule } from './api/ps/simulator-history/simulator-history.module';
import { SimulatorResultAwbJoinModule } from './api/ps/simulator-result-awb-join/simulator-result-awb-join.module';
import { TimeTableModule } from './api/time-table/time-table.module';
import { AircraftModule } from './api/flight/aircraft/aircraft.module';
import { AircraftScheduleModule } from './api/flight/aircraft-schedule/aircraft-schedule.module';
import { CommonCodeModule } from './api/reference/common-code/common-code.module';
import { VmsModule } from './api/facility/vms/vms/vms.module';
import { Vms2dModule } from './api/facility/vms/vms2d/vms2d.module';
import { VmsAwbResultModule } from './api/facility/vms/vms-awb-result/vms-awb-result.module';
import { MqttModule } from './mqtt.module';
import { AlarmModule } from './api/alarm/alarm.module';
import { WorkerModule } from './worker/worker.module';
import { FileModule } from './file/file.module';
import { HacsModule } from './api/facility/amr/hacs/hacs.module';
import { CheckModule } from './api/check/check.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [AppController],
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

    AmrModule,
    AmrChargerModule,
    AmrChargeHistoryModule,
    AsrsModule,
    AwbModule,
    AwbSccJoinModule,
    SccModule,
    UldModule,
    UldHistoryModule,
    UldSccJoinModule,
    UldTypeModule,
    AsrsOutOrderModule,
    BuildUpOrderModule,
    SkidPlatformModule,
    SkidPlatformHistoryModule,
    AsrsHistoryModule,
    SimulatorResultModule,
    SimulatorHistoryModule,
    SimulatorResultAwbJoinModule,
    TimeTableModule,
    AircraftModule,
    AircraftScheduleModule,
    CommonCodeModule,

    // mssql의 vms 테이블 설정
    VmsModule,
    Vms2dModule,
    VmsAwbResultModule,

    // mqtt 모듈설정
    MqttModule,

    // redis 모듈설정
    RedisModule,

    // schedule 모듈 설정
    ScheduleModule.forRoot(),

    // file 모듈 설정
    FileModule,

    HacsModule,
    CheckModule,
    AlarmModule,
    WorkerModule,
    BasicModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

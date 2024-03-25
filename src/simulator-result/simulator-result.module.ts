import { Module } from '@nestjs/common';
import { SimulatorResultService } from './simulator-result.service';
import { SimulatorResultController } from './simulator-result.controller';
import { SimulatorResult } from './entities/simulator-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulatorHistory } from '../simulator-history/entities/simulator-history.entity';
import { SkidPlatformHistory } from '../skid-platform-history/entities/skid-platform-history.entity';
import { AsrsHistory } from '../asrs-history/entities/asrs-history.entity';
import { AsrsOutOrder } from '../asrs-out-order/entities/asrs-out-order.entity';
import { BuildUpOrder } from '../build-up-order/entities/build-up-order.entity';
import { MqttModule } from '../mqtt.module';
import { BuildUpOrderService } from '../build-up-order/build-up-order.service';
import { UldHistory } from '../uld-history/entities/uld-history.entity';
import { Uld } from '../uld/entities/uld.entity';
import { AsrsHistoryService } from '../asrs-history/asrs-history.service';
import { SkidPlatformHistoryService } from '../skid-platform-history/skid-platform-history.service';
import { UldHistoryService } from '../uld-history/uld-history.service';
import { Awb } from '../awb/entities/awb.entity';
import { Asrs } from '../asrs/entities/asrs.entity';
import { SkidPlatform } from '../skid-platform/entities/skid-platform.entity';
import { RedisService } from '../redis/redis.service';
import { redisCustomProvider } from '../redis/redisCustomProvider';
import { UldType } from '../uld-type/entities/uld-type.entity';
import { UldService } from '../uld/uld.service';
import { UldSccJoin } from '../uld-scc-join/entities/uld-scc-join.entity';
import { AwbUtilService } from '../awb/awbUtil.service';
import { Scc } from '../scc/entities/scc.entity';
import { AircraftSchedule } from '../aircraft-schedule/entities/aircraft-schedule.entity';
import { FileService } from '../file/file.service';
import { SccService } from '../scc/scc.service';
import { Basic } from '../basic/entities/basic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SimulatorResult,
      SimulatorHistory,
      // 안착대 이력을 가져오기 위함
      SkidPlatformHistory,
      // 창고 이력을 가져오기 위함
      AsrsHistory,
      // 자동창고 작업지시 만들기위함
      AsrsOutOrder,
      // 작업자 작업지시 만들기위함
      BuildUpOrder,
      UldHistory,
      Uld,
      UldType,
      UldSccJoin,
      Awb,
      Asrs,
      SkidPlatform,
      Scc,
      AircraftSchedule,
      Basic,
    ]),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [SimulatorResultController],
  providers: [
    SimulatorResultService,
    BuildUpOrderService,
    AsrsHistoryService,
    SkidPlatformHistoryService,
    UldHistoryService,
    UldService,
    RedisService,
    AwbUtilService,
    FileService,
    SccService,
    ...redisCustomProvider,
  ],
})
export class SimulatorResultModule {}

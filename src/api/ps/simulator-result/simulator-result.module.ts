import { Module } from '@nestjs/common';
import { SimulatorResultService } from './simulator-result.service';
import { SimulatorResultController } from './simulator-result.controller';
import { SimulatorResult } from './entities/simulator-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulatorHistory } from '../simulator-history/entities/simulator-history.entity';
import { AsrsOutOrder } from '../asrs-out-order/entities/asrs-out-order.entity';
import { BuildUpOrder } from '../build-up-order/entities/build-up-order.entity';
import { BuildUpOrderService } from '../build-up-order/build-up-order.service';
import { SkidPlatformHistory } from '../../facility/skidPlat/skid-platform-history/entities/skid-platform-history.entity';
import { AsrsHistory } from '../../facility/asrs/asrs-history/entities/asrs-history.entity';
import { MqttModule } from '../../../mqtt.module';
import { UldHistory } from '../../facility/uld/uld-history/entities/uld-history.entity';
import { Uld } from '../../facility/uld/uld/entities/uld.entity';
import { AsrsHistoryService } from '../../facility/asrs/asrs-history/asrs-history.service';
import { SkidPlatformHistoryService } from '../../facility/skidPlat/skid-platform-history/skid-platform-history.service';
import { UldHistoryService } from '../../facility/uld/uld-history/uld-history.service';
import { Awb } from '../../cargo/awb/entities/awb.entity';
import { Asrs } from '../../facility/asrs/asrs/entities/asrs.entity';
import { SkidPlatform } from '../../facility/skidPlat/skid-platform/entities/skid-platform.entity';
import { RedisService } from '../../../redis/redis.service';
import { redisCustomProvider } from '../../../redis/redisCustomProvider';
import { UldType } from '../../facility/uld/uld-type/entities/uld-type.entity';
import { UldService } from '../../facility/uld/uld/uld.service';
import { UldSccJoin } from '../../facility/uld/uld-scc-join/entities/uld-scc-join.entity';
import { AwbUtilService } from '../../cargo/awb/awbUtil.service';
import { Scc } from '../../cargo/scc/entities/scc.entity';
import { AircraftSchedule } from '../../flight/aircraft-schedule/entities/aircraft-schedule.entity';
import { FileService } from '../../../file/file.service';
import { SccService } from '../../cargo/scc/scc.service';

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
    AwbUtilService,
    FileService,
    SccService,
    RedisService,
    ...redisCustomProvider,
  ],
})
export class SimulatorResultModule {}

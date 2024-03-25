import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsrsOutOrder } from './entities/asrs-out-order.entity';
import { AsrsOutOrderController } from './asrs-out-order.controller';
import { AsrsOutOrderService } from './asrs-out-order.service';
import { MqttModule } from '../../../mqtt.module';
import { AsrsHistoryService } from '../../facility/asrs/asrs-history/asrs-history.service';
import { AsrsHistory } from '../../facility/asrs/asrs-history/entities/asrs-history.entity';
import { Asrs } from '../../facility/asrs/asrs/entities/asrs.entity';
import { Awb } from '../../cargo/awb/entities/awb.entity';
import { RedisService } from '../../../redis/redis.service';
import { redisCustomProvider } from '../../../redis/redisCustomProvider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AsrsOutOrder,
      AsrsHistory,
      Asrs,
      Awb,
      AsrsOutOrder,
    ]),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [AsrsOutOrderController],
  providers: [
    AsrsOutOrderService,
    AsrsHistoryService,
    RedisService,
    ...redisCustomProvider,
  ],
})
export class AsrsOutOrderModule {}

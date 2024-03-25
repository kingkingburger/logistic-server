import { Module } from '@nestjs/common';
import { AmrService } from './amr.service';
import { AmrController } from './amr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amr } from './entities/amr.entity';
import { Hacs } from '../hacs/entities/hacs.entity';
import { MqttModule } from '../../../../mqtt.module';
import { AlarmService } from '../../../alarm/alarm.service';
import { RedisService } from '../../../../redis/redis.service';
import { Alarm } from '../../../alarm/entities/alarm.entity';
import { redisCustomProvider } from '../../../../redis/redisCustomProvider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Amr, Alarm]),
    TypeOrmModule.forFeature([Hacs], 'amrDB'),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [AmrController],
  providers: [
    AmrService,
    {
      provide: 'SERVICE_NAME', // 여기에서 프로바이더 이름을 지정합니다.
      useValue: 'AmrService', // 원하는 값을 useValue로 지정합니다.
    },
    AlarmService,
    RedisService,
    ...redisCustomProvider,
  ],
})
export class AmrModule {}

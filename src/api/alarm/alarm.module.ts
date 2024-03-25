import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from './alarm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from './entities/alarm.entity';
import { MqttModule } from '../../mqtt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alarm]),
    // mqtt 모듈설정
    MqttModule,
  ],
  controllers: [AlarmController],
  providers: [AlarmService],
})
export class AlarmModule {}

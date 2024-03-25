import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckController } from './check.controller';
import { Hacs } from '../facility/amr/hacs/entities/hacs.entity';
import { MqttModule } from '../../mqtt.module';
import { MqttService } from '../../mqtt.service';
import { FileService } from '../../file/file.service';
import { Vms3D } from '../facility/vms/vms/entities/vms.entity';
import { VmsAwbResult } from '../facility/vms/vms-awb-result/entities/vms-awb-result.entity';
import { VmsAwbHistory } from '../facility/vms/vms-awb-history/entities/vms-awb-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vms3D], 'mssqlDB'),
    TypeOrmModule.forFeature([VmsAwbResult, VmsAwbHistory], 'dimoaDB'),
    TypeOrmModule.forFeature([Hacs], 'amrDB'),
    MqttModule,
  ],

  controllers: [CheckController],
  providers: [MqttService, FileService],
})
export class CheckModule {}

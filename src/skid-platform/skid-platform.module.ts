import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkidPlatform } from './entities/skid-platform.entity';
import { SkidPlatformController } from './skid-platform.controller';
import { SkidPlatformService } from './skid-platform.service';
import { SkidPlatformHistory } from '../skid-platform-history/entities/skid-platform-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkidPlatform, SkidPlatformHistory])],
  controllers: [SkidPlatformController],
  providers: [SkidPlatformService],
})
export class SkidPlatformModule {}

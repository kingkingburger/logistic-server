import { Body, Controller, Post } from '@nestjs/common';
import { HacsService } from './hacs.service';
import { CreateHacsDto } from './dto/create-hacs.dto';

@Controller('hacs')
export class HacsController {}

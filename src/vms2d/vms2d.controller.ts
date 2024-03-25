import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Vms2dService } from './vms2d.service';
import { CreateVms2dDto } from './dto/create-vms2d.dto';
import { BasicQueryParamDto } from '../lib/dto/basicQueryParam.dto';
import { Vms2d } from './entities/vms2d.entity';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('vms2d')
@ApiTags('[VMS2d by mssql] VMS2d')
export class Vms2dController {
  constructor(private readonly vms2dService: Vms2dService) {}

  @Post()
  create(@Body() createVms2dDto: CreateVms2dDto) {
    return this.vms2dService.create(createVms2dDto);
  }

  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'createdAtFrom', required: false })
  @ApiQuery({ name: 'createdAtTo', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  @Get()
  findAll(@Query() query: Vms2d & BasicQueryParamDto) {
    return this.vms2dService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vms2dService.findOne(+id);
  }
}

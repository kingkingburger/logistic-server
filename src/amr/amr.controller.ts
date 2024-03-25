import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AmrService } from './amr.service';
import { CreateAmrDto } from './dto/create-amr.dto';
import { UpdateAmrDto } from './dto/update-amr.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('amr')
@ApiTags('[Amr]amr')
export class AmrController {
  constructor(private readonly amrService: AmrService) {}

  @Post()
  create(@Body() createAmrDto: CreateAmrDto) {
    return this.amrService.create(createAmrDto);
  }

  // mssql이 연결 안됬을 때 태스트용도로 만들었던 api
  @ApiOperation({
    summary:
      '[사용x] amr의 움직임 데이터 확인 테스트용 api, mssql에서 amr 데이터 스케줄러로 0.3초마다 동작됨, mssql이 연결 안됬을 때 태스트용도로 만들었던 api',
    description: 'amr, amrCharge, amrChargeHistory 모두 등록함',
  })
  @Get('/test/moving-data')
  createByPlc() {
    return this.amrService.createAmrByHacs();
  }

  @ApiQuery({ name: 'name', required: false, type: 'string' })
  @ApiQuery({ name: 'charging', required: false, type: 'boolean' })
  @ApiQuery({ name: 'prcsCD', required: false, type: 'string' })
  @ApiQuery({ name: 'ACSMode', required: false, type: 'boolean' })
  @ApiQuery({ name: 'mode', required: false, type: 'number' })
  @ApiQuery({ name: 'errorLevel', required: false, type: 'number' })
  @ApiQuery({ name: 'errorCode', required: false, type: 'string' })
  @ApiQuery({ name: 'startTimeFrom', required: false, type: 'Date' })
  @ApiQuery({ name: 'startTimeTo', required: false, type: 'Date' })
  @ApiQuery({ name: 'endTimeFrom', required: false, type: 'Date' })
  @ApiQuery({ name: 'endTimeTo', required: false, type: 'Date' })
  @ApiQuery({ name: 'travelDist', required: false, type: 'number' })
  @ApiQuery({ name: 'oprTime', required: false, type: 'Date' })
  @ApiQuery({ name: 'stopTime', required: false, type: 'Date' })
  @ApiQuery({ name: 'startBatteryLevel', required: false, type: 'number' })
  @ApiQuery({ name: 'lastBatteryLevel', required: false, type: 'number' })
  @ApiQuery({ name: 'simulation', required: false, type: 'boolean' })
  @ApiQuery({ name: 'logDT', required: false, type: 'string' })
  @ApiQuery({ name: 'distinguish', required: false, type: 'string' })
  @ApiQuery({ name: 'createdAtFrom', required: false })
  @ApiQuery({ name: 'createdAtTo', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('charging') charging?: boolean,
    @Query('prcsCD') prcsCD?: string,
    @Query('ACSMode') ACSMode?: boolean,
    @Query('mode') mode?: number,
    @Query('errorLevel') errorLevel?: number,
    @Query('errorCode') errorCode?: string,
    @Query('startTimeFrom') startTimeFrom?: Date,
    @Query('startTimeTo') startTimeTo?: Date,
    @Query('endTimeFrom') endTimeFrom?: Date,
    @Query('endTimeTo') endTimeTo?: Date,
    @Query('travelDist') travelDist?: number,
    @Query('oprTime') oprTime?: number,
    @Query('stopTime') stopTime?: number,
    @Query('startBatteryLevel') startBatteryLevel?: number,
    @Query('lastBatteryLevel') lastBatteryLevel?: number,
    @Query('simulation') simulation?: boolean,
    @Query('logDT') logDT?: string,
    @Query('distinguish') distinguish?: string,
    @Query('createdAtFrom') createdAtFrom?: Date,
    @Query('createdAtTo') createdAtTo?: Date,
    @Query('order') order?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.amrService.findAll(
      name,
      charging,
      prcsCD,
      ACSMode,
      mode,
      errorLevel,
      errorCode,
      startTimeFrom,
      startTimeTo,
      endTimeFrom,
      endTimeTo,
      travelDist,
      oprTime,
      stopTime,
      startBatteryLevel,
      lastBatteryLevel,
      simulation,
      logDT,
      distinguish,
      createdAtFrom,
      createdAtTo,
      order,
      limit,
      offset,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amrService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAmrDto: UpdateAmrDto) {
    return this.amrService.update(+id, updateAmrDto);
  }

  @Delete('/redis-reset')
  removeRedis() {
    const amrName = ['R_001', 'R_002', 'R_003', 'R_004', 'R_005'];
    for (const amr of amrName) {
      this.amrService.removeRedis(amr);
    }
    return this.amrService.removeRedis('R_001');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amrService.remove(+id);
  }
}

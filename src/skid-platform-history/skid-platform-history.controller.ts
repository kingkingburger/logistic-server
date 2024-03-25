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
import { SkidPlatformHistoryService } from './skid-platform-history.service';
import { CreateSkidPlatformHistoryDto } from './dto/create-skid-platform-history.dto';
import { UpdateSkidPlatformHistoryDto } from './dto/update-skid-platform-history.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BasicQueryParamDto } from '../lib/dto/basicQueryParam.dto';
import { SkidPlatformHistory } from './entities/skid-platform-history.entity';

@Controller('skid-platform-history')
@ApiTags('[안착대 이력]skid-platform-history')
export class SkidPlatformHistoryController {
  constructor(
    private readonly skidPlatformHistoryService: SkidPlatformHistoryService,
  ) {}

  @ApiOperation({
    summary: '안착대에 화물의 입,출고를 저장하기 위한 api',
    description:
      '[사용법] Asrs: 불출된 창고ID, SkidPlatform: 목표 안착대ID, Awb: 목표 화물, inOutType: 입고(in), 출고(out) 판단',
  })
  @Post()
  create(@Body() createSkidPlatformHistoryDto: CreateSkidPlatformHistoryDto) {
    return this.skidPlatformHistoryService.create(createSkidPlatformHistoryDto);
  }

  @ApiQuery({ name: 'Awb', required: false, type: 'number' })
  @ApiQuery({ name: 'Asrs', required: false, type: 'number' })
  @ApiQuery({ name: 'SkidPlatform', required: false, type: 'number' })
  @ApiQuery({ name: 'AsrsOutOrder', required: false, type: 'number' })
  @ApiQuery({ name: 'createdAtFrom', required: false })
  @ApiQuery({ name: 'createdAtTo', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  @Get()
  findAll(@Query() query: SkidPlatformHistory & BasicQueryParamDto) {
    return this.skidPlatformHistoryService.findAll(query);
  }

  @ApiOperation({
    summary: '안착대의 이력 최신본 삭제',
    description: '안착대의 이력 최신본 삭제',
  })
  @Post('/reset')
  resetAsrs() {
    return this.skidPlatformHistoryService.resetSkidPlatform();
  }

  @ApiOperation({
    summary: '안착대의 이력 삭제',
    description: '안착대의 이력 삭제',
  })
  @Delete('/reset-all')
  resetAsrsAll() {
    return this.skidPlatformHistoryService.resetSkidPlatformAll();
  }

  @ApiOperation({
    summary: '안착대의 현재 상태를 가져오기(inOutType이 out 이면 빈 안착대)',
    description: '안착대id로 이력의 최신본만 가져오기',
  })
  @Get('/now')
  StatusOfSkidplatform() {
    return this.skidPlatformHistoryService.nowState();
  }

  @ApiOperation({
    summary: '안착대의 현재 상태를 가져오기(inOutType이 out 이면 빈 안착대)',
    description: '안착대id로 이력의 최신본만 가져오기',
  })
  @Get('/now/virtual/:virtual')
  StatusOfVirtualSkidplatform(@Param('virtual') virtual: boolean) {
    return this.skidPlatformHistoryService.nowVirtualState(virtual);
  }

  @ApiOperation({
    summary: '빈 안착대 id 가져오기',
    description: '빈 안착대 id 가져오기',
  })
  @Get('/empty-skid-platform')
  StatusOfEmptySkidplatform() {
    return this.skidPlatformHistoryService.getEmptySkidPlatform();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skidPlatformHistoryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkidPlatformHistoryDto: UpdateSkidPlatformHistoryDto,
  ) {
    return this.skidPlatformHistoryService.update(
      +id,
      updateSkidPlatformHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skidPlatformHistoryService.remove(+id);
  }
}

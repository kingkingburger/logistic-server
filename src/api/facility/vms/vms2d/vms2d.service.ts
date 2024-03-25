import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { BasicQueryParamDto } from '../../../../lib/dto/basicQueryParam.dto';
import { Vms2d } from './entities/vms2d.entity';
import { CreateVms2dDto } from './dto/create-vms2d.dto';
import { orderByUtil } from '../../../../lib/util/orderBy.util';

@Injectable()
export class Vms2dService {
  constructor(
    @InjectRepository(Vms2d, 'mssqlDB')
    private readonly vms2dRepository: Repository<Vms2d>,
  ) {}

  create(createVmsDto: CreateVms2dDto) {
    return this.vms2dRepository.save(createVmsDto);
  }

  async findAll(query: Vms2d & BasicQueryParamDto) {
    return await this.vms2dRepository.find({
      where: {
        AWB_NUMBER: query.AWB_NUMBER
          ? ILike(`%${query.AWB_NUMBER}%`)
          : undefined,
      },
      order: orderByUtil(query.order),
      take: query.limit,
      skip: query.offset,
    });
  }

  async findOne(id: number) {}
}

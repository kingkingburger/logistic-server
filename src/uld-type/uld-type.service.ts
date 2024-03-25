import { Injectable } from '@nestjs/common';
import { CreateUldTypeDto } from './dto/create-uld-type.dto';
import { UpdateUldTypeDto } from './dto/update-uld-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOperator,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UldType } from './entities/uld-type.entity';
import { BasicQueryParamDto } from '../lib/dto/basicQueryParam.dto';
import { orderByUtil } from '../lib/util/orderBy.util';

@Injectable()
export class UldTypeService {
  constructor(
    @InjectRepository(UldType)
    private readonly uldTypeRepository: Repository<UldType>,
  ) {}
  async create(createUldTypeDto: CreateUldTypeDto) {
    const result = await this.uldTypeRepository.create(createUldTypeDto);

    await this.uldTypeRepository.save(result);
    return result;
  }

  async upsert(createUldTypeDto: CreateUldTypeDto) {
    const upsertResult = await this.uldTypeRepository.upsert(createUldTypeDto, [
      'code',
    ]);
    return upsertResult;
  }

  async findAll(query: UldType & BasicQueryParamDto) {
    // createdAt 기간검색 처리
    const { createdAtFrom, createdAtTo } = query;
    let findDate: FindOperator<Date>;
    if (createdAtFrom && createdAtTo) {
      findDate = Between(createdAtFrom, createdAtTo);
    } else if (createdAtFrom) {
      findDate = MoreThanOrEqual(createdAtFrom);
    } else if (createdAtTo) {
      findDate = LessThanOrEqual(createdAtTo);
    }
    return await this.uldTypeRepository.find({
      where: {
        code: query.code ? ILike(`%${query.code}%`) : undefined,
        name: query.name ? ILike(`%${query.name}%`) : undefined,
        createdAt: findDate,
      },
      order: orderByUtil(query.order),
      take: query.limit,
      skip: query.offset,
    });
  }

  async findOne(id: number) {
    const result = await this.uldTypeRepository.findOne({
      where: { id: id },
    });
    return result;
  }

  update(id: number, updateUldTypeDto: UpdateUldTypeDto) {
    return this.uldTypeRepository.update(id, updateUldTypeDto);
  }

  remove(id: number) {
    return this.uldTypeRepository.delete(id);
  }

  async upload(id: number, file: Express.Multer.File) {
    try {
      // parameter에 있는 Awb 정보에 모델링파일을 연결합니다.
      await this.uldTypeRepository.update(id, { modelPath: file.path });
    } catch (e) {
      console.error(e);
    }
  }
}

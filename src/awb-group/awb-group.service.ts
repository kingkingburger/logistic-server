import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  DataSource,
  FindOperator,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  TypeORMError,
} from 'typeorm';
import { AwbGroup } from './entities/awb-group.entity';
import { CreateAwbGroupDto } from './dto/create-awb-group.dto';
import { UpdateAwbGroupDto } from './dto/update-awb-group.dto';
import { BasicQueryParamDto } from '../lib/dto/basicQueryParam.dto';
import { orderByUtil } from '../lib/util/orderBy.util';
import { CreateAwbDto } from '../awb/dto/create-awb.dto';
import { AwbService } from '../awb/awb.service';

@Injectable()
export class AwbGroupService {
  constructor(
    @InjectRepository(AwbGroup)
    private readonly awbGroupRepository: Repository<AwbGroup>,
    private dataSource: DataSource,
    private readonly AwbService: AwbService,
  ) {}

  async create(createAwbGroupDto: CreateAwbGroupDto) {
    const { code, awbs } = createAwbGroupDto;

    const queryRunner = await this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const awbGroupBody: CreateAwbGroupDto = {
        code: code,
      };
      const awbGroupResult = await queryRunner.manager
        .getRepository(AwbGroup)
        .save(awbGroupBody);

      for (const awb of awbs) {
        const createAwbBody: CreateAwbDto = awb as unknown as CreateAwbDto;
        createAwbBody.AwbGroup = awbGroupResult;
        await this.AwbService.createWithOtherTransaction(
          createAwbBody,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new TypeORMError(`rollback Working - ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  findAll(query: AwbGroup & BasicQueryParamDto) {
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
    return this.awbGroupRepository.find({
      where: {
        code: query.code ? ILike(`%${query.code}%`) : undefined,
        createdAt: findDate,
      },
      order: orderByUtil(query.order),
      take: query.limit,
      skip: query.offset,
    });
  }

  findOne(id: number) {
    return this.awbGroupRepository.find({ where: { id: id } });
  }

  update(id: number, updateCargoGroupDto: UpdateAwbGroupDto) {
    return this.awbGroupRepository.update(id, updateCargoGroupDto);
  }

  remove(id: number) {
    return this.awbGroupRepository.delete(id);
  }
}

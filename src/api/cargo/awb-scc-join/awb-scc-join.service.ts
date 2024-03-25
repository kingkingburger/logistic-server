import { Injectable } from '@nestjs/common';
import { CreateAwbSccJoinDto } from './dto/create-awb-scc-join.dto';
import { UpdateAwbSccJoinDto } from './dto/update-awb-scc-join.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AwbSccJoin } from './entities/awb-scc-join.entity';
import { Awb } from '../awb/entities/awb.entity';
import { Scc } from '../scc/entities/scc.entity';
import { BasicQueryParamDto } from '../../../lib/dto/basicQueryParam.dto';

@Injectable()
export class AwbSccJoinService {
  constructor(
    @InjectRepository(AwbSccJoin)
    private readonly awbSccJoinRepository: Repository<AwbSccJoin>,
    @InjectRepository(Awb)
    private readonly awbRepository: Repository<Awb>,
    @InjectRepository(Scc)
    private readonly sccRepository: Repository<Scc>,
  ) {}
  create(createAwbSccJoinDto: CreateAwbSccJoinDto) {
    return this.awbSccJoinRepository.save(createAwbSccJoinDto);
  }

  async findAll(
    query: AwbSccJoin & BasicQueryParamDto,
    SccName: string,
    AwbName: string,
  ) {}

  findOne(id: number) {
    // return this.awbSccJoinRepository.find({ where: { id: id } });
  }

  update(id: number, updateCargoSccJoinDto: UpdateAwbSccJoinDto) {
    return this.awbSccJoinRepository.update(id, updateCargoSccJoinDto);
  }

  remove(id: number) {
    return this.awbSccJoinRepository.delete(id);
  }
}

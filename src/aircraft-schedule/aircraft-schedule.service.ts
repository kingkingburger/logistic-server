import { Inject, Injectable } from '@nestjs/common';
import { CreateAircraftScheduleDto } from './dto/create-aircraft-schedule.dto';
import { UpdateAircraftScheduleDto } from './dto/update-aircraft-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AircraftSchedule } from './entities/aircraft-schedule.entity';
import {
  Between,
  DataSource,
  Equal,
  FindOperator,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { AircraftAttribute } from '../aircraft/entities/aircraft.entity';
import { orderByUtil } from '../lib/util/orderBy.util';
import { Awb, AwbSimpleAttribute } from '../awb/entities/awb.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Uld, UldAttribute } from '../uld/entities/uld.entity';
import {
  UldType,
  UldTypeAttribute,
} from '../uld-type/entities/uld-type.entity';
import { UldHistoryAttribute } from '../uld-history/entities/uld-history.entity';
import { SccAttribute } from '../scc/entities/scc.entity';
import { adjustDate } from '../lib/util/adjustDate';

@Injectable()
export class AircraftScheduleService {
  constructor(
    @InjectRepository(Awb)
    private readonly awbRepository: Repository<Awb>,
    @InjectRepository(Uld)
    private readonly uldRepository: Repository<Uld>,
    @InjectRepository(UldType)
    private readonly UldTypeRepository: Repository<UldType>,
    @InjectRepository(AircraftSchedule)
    private readonly aircraftScheduleRepository: Repository<AircraftSchedule>,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
    private dataSource: DataSource,
  ) {}

  async create(createAircraftScheduleDto: CreateAircraftScheduleDto) {
    const insertResult = await this.aircraftScheduleRepository.save(
      createAircraftScheduleDto,
    );
    this.client
      .send(`hyundai/aircraftSchedule/insert`, insertResult)
      .subscribe();
    return insertResult;
  }

  async createWithAwbs(createAircraftScheduleDto: CreateAircraftScheduleDto) {
    const { Awbs, ...aircraftSchedule } = createAircraftScheduleDto;

    const aircraftScheduleResult = await this.aircraftScheduleRepository.save(
      createAircraftScheduleDto,
    );

    for (const awb of Awbs) {
      awb.AirCraftSchedule = aircraftScheduleResult.id;
      const awbsResult = this.awbRepository.save(awb);
    }
    const insertResult = await this.aircraftScheduleRepository.save(
      createAircraftScheduleDto,
    );
    this.client
      .send(`hyundai/aircraftSchedule/insert`, insertResult)
      .subscribe();
    return insertResult;
  }

  async findAll(
    Aircraft: number,
    destination: string,
    departure: string,
    source?: string,
    createdAtFrom?: Date,
    createdAtTo?: Date,
    order?: string,
    limit?: number,
    offset?: number,
    done?: boolean,
  ) {
    let findDate: FindOperator<Date>;
    if (createdAtFrom && createdAtTo) {
      findDate = Between(createdAtFrom, createdAtTo);
    } else if (createdAtFrom) {
      findDate = MoreThanOrEqual(createdAtFrom);
    } else if (createdAtTo) {
      findDate = LessThanOrEqual(createdAtTo);
    }

    const result = await this.aircraftScheduleRepository.find({
      relations: {
        Aircraft: true,
        Awbs: { Scc: true },
        Ulds: {
          UldType: true,
          uldHistories: {
            Awb: {
              Scc: true,
            },
          },
        },
      },
      select: {
        Aircraft: AircraftAttribute,
        Awbs: { ...AwbSimpleAttribute, Scc: SccAttribute },
        Ulds: {
          ...UldAttribute,
          UldType: UldTypeAttribute,
          uldHistories: {
            ...UldHistoryAttribute,
            Awb: { ...AwbSimpleAttribute, Scc: SccAttribute },
          },
        },
      },
      where: {
        source: source ? ILike(`%${source}%`) : undefined,
        Aircraft: Aircraft ? Equal(+Aircraft) : undefined,
        destination: destination ? destination : undefined,
        departure: departure ? departure : undefined,
        createdAt: findDate,
        done: done,
      },
      order: orderByUtil(order),
      take: limit, // limit
      skip: offset, // offset
      // cache: 60000, // 1 minute caching
    });

    // 날짜 조정 로직 적용
    const updatedFindResult = result.map((item) => {
      if (item.createdAt instanceof Date && item.updatedAt instanceof Date) {
        return {
          ...item,
          createdAt: adjustDate(item.createdAt, 9), // createdAt에 +9시간
          updatedAt: adjustDate(item.updatedAt, 9), // updatedAt에 +9시간
        };
      }
      return item;
    });

    this.client
      .send(`hyundai/aircraftSchedule/find`, updatedFindResult)
      .subscribe();

    return updatedFindResult;
  }

  async findOne(id: number) {
    const result = await this.aircraftScheduleRepository.find({
      where: { id: id },
      relations: {
        Aircraft: true,
        Awbs: { Scc: true },
        Ulds: {
          UldType: true,

          uldHistories: {
            Awb: { Scc: true },
          },
        },
      },
      select: {
        Aircraft: AircraftAttribute,
        Awbs: AwbSimpleAttribute,
        Ulds: {
          UldType: UldTypeAttribute,
          ...UldAttribute,
          uldHistories: {
            ...UldHistoryAttribute,
            Awb: { ...AwbSimpleAttribute, Scc: SccAttribute },
          },
        },
      },
    });
    this.client.send(`hyundai/aircraftSchedule/find`, result).subscribe();
    return result;
  }

  async update(
    id: number,
    updateAircraftScheduleDto: UpdateAircraftScheduleDto,
  ) {
    const { source, Aircraft } = updateAircraftScheduleDto;
    await this.aircraftScheduleRepository.update(id, {
      source,
      Aircraft,
    });
    return;
  }

  // aircraftSchedule의 상태를 변경하는 메서드
  updateState(
    id: number,
    done: string,
    updateAircraftScheduleDto?: UpdateAircraftScheduleDto,
  ) {
    if (done) updateAircraftScheduleDto.done = done === 'true';

    this.client
      .send(`hyundai/aircraftSchedule/updateState`, updateAircraftScheduleDto)
      .subscribe();

    return this.aircraftScheduleRepository.update(
      id,
      updateAircraftScheduleDto,
    );
  }

  async remove(id: number) {
    return await this.aircraftScheduleRepository.delete(id);
  }
}

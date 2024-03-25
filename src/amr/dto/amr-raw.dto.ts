import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class AmrRawDto {
  @ApiProperty({
    example: 1,
    description: '로봇번호',
  })
  public Amrld: number;
  @ApiProperty({
    example: new Date(),
    description: '데이터 업데이트 일자',
  })
  public LogDT: string;
  // @ApiProperty({
  //   example: 'Amr-001',
  //   description: '공정코드',
  // })
  // public PrcsCD: string;
  // @ApiProperty({
  //   example: 1,
  //   description: 'ACS 모드',
  // })
  // public ACSMode?: number;
  @ApiProperty({
    example: 2,
    description: '로봇모드',
  })
  public Mode?: number;
  @ApiProperty({
    example: 19440.0,
    description: 'x좌표',
  })
  public X: number;
  @ApiProperty({
    example: 18220.2,
    description: 'y좌표',
  })
  public Y: number;
  @ApiProperty({
    example: 30,
    description: '로봇헤딩',
  })
  public H: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '자재방향',
  // })
  // public Dir: number;
  @ApiProperty({
    example: 0.3,
    description: '현재속도(m/s)',
  })
  public Speed: number;
  // @ApiProperty({
  //   example: 1,
  //   description: '현재노드번호',
  // })
  // public CurrentNode: number;
  // @ApiProperty({
  //   example: 1,
  //   description: '시작지노드번호(미사용)',
  // })
  // public StartNode: number;
  // @ApiProperty({
  //   example: 1,
  //   description: '목적지 노드번호',
  // })
  // public TargetNode: number;
  @ApiProperty({
    example: 1,
    description: '통신 연결상태',
  })
  public Connected: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '마지막 에러의 에러레벨',
  // })
  // public ErrorLevel: number;
  @ApiProperty({
    example: 0,
    description: '마지막 에러의 에러코드',
  })
  public ErrorCode: number;
  @ApiProperty({
    example: 'test error message',
    description: '에러메시지',
  })
  public ErrorInfo: string;
  // @ApiProperty({
  //   example: '0',
  //   description: '화면상태',
  // })
  // public DisplayState: string;
  @ApiProperty({
    example: 'moving',
    description: '로봇의 현재 상태(이동, 리프팅 등)',
  })
  public CurState: string;
  @ApiProperty({
    example: 0,
    description: '일시정지 상태(업=1, 다운=0)',
  })
  public PauseState: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '',
  // })
  // public Lift: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '리프트상태',
  // })
  // public LiftStatus: number;
  @ApiProperty({
    example: 0,
    description: '리프트상태',
  })
  public Loaded: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '리프트상태',
  // })
  // public LoadLevel: number;
  // @ApiProperty({
  //   example: 0,
  //   description:
  //     '턴테이블 상태(미감지 = 0, 12시 방향 = 1, 3시 방향 = 2, 6시 방향 = 3, 9시 방향 = 4)',
  // })
  // public Turn: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '자체방향',
  // })
  // public MDir: number;
  // @ApiProperty({
  //   example: 0,
  //   description: '턴테이블',
  // })
  // public TurnTable: number;
  @ApiProperty({
    example: 0,
    description:
      '턴테이블 상태(미감지 = 0, 12시 방향 = 1, 3시 방향 = 2, 6시 방향 = 3, 9시 방향 = 4)',
  })
  public TurnTableStatus: number;
  @ApiProperty({
    example: 74,
    description: '배터리SOC',
  })
  public SOC: number;
  @ApiProperty({
    example:
      '{Cmd":"GB","BCellVolt":39576,"BPackVolt":40000,"BPackCurrent":1000,"BChargeVolt":40000,"BTemperature":31,"Battery":81,"BError":0,"BWarning":0}',
    description: '배터리SOH',
  })
  public SOH: string;
  @ApiProperty({
    example: 1,
    description: '파레트no',
  })
  public PLTNo: number;
  @ApiProperty({
    example: null,
    description: '파레트 타입',
  })
  public PLTType: string;
  // @ApiProperty({
  //   example: '1',
  //   description: '전표번호',
  // })
  // public TransNo: string;
  // @ApiProperty({
  //   example: 'order-001',
  //   description: '작업지시 번호',
  // })
  // public OrderNo: string;
  @ApiProperty({
    example: '',
    description: '파트정보',
  })
  public PartInfo: string;
  @ApiProperty({
    example: {
      Index: 0,
      Action: 8,
      ActionProperty: 0,
      Speed: 0.8,
      Angle: 0.0,
      Safety: [1, 1, 1, 1],
      LaneWidth: 0.0,
      X: 19440.0,
      Y: 4620.0,
      H: 0.0,
      Node: 840,
      Level: 0,
      LiftHeight: 0,
      PLTType: null,
      ConveyorAction: null,
    },
    description: '로봇경로정보(json타입)',
  })
  public Paths: string;
  // @ApiProperty({
  //   example: 1,
  //   description: '수행중인 미션 그룹번호',
  // })
  // public GroupNo: number;
  @ApiProperty({
    example: 1,
    description: '수행중인 미션번호',
  })
  public MissionNo: number;
  @ApiProperty({
    example: 1,
    description: '수행중인 미션번호',
  })
  public Missionld: number;
  @ApiProperty({
    example: 1,
    description: '수행중인 작업번호',
  })
  public JobId: number;
  // @ApiProperty({
  //   example: 1,
  //   description: '수행중인 액션아이디',
  // })
  // public ActionId: number;
  @ApiProperty({
    example: 50,
    description: '미션 진척율',
  })
  public Prog: number;
  @ApiProperty({
    example: new Date(),
    description: '도착예상시간',
  })
  public DestTime: Date;
  @ApiProperty({
    example: new Date(),
    description: '미션할당시간',
  })
  public CreationTime: Date;
  @ApiProperty({
    example: new Date(),
    description: '미션시작시간',
  })
  public StartTime: Date;
  @ApiProperty({
    example: new Date(),
    description: '미션종료시간',
  })
  public EndTime: Date;
  // @ApiProperty({
  //   example: 1,
  //   description: '리프트카운트',
  // })
  // public LiftCnt: number;
  @ApiProperty({
    example: 19.0,
    description: '누적이동거리',
  })
  public TravelDist: number;
  @ApiProperty({
    example: 13.0,
    description: '누적운행시간',
  })
  public OprTime: number;
  @ApiProperty({
    example: 14.0,
    description: '누적정지시간',
  })
  public StopTime: number;
  @ApiProperty({
    example: 74,
    description: '충전시작 배터리량',
  })
  public StartBatteryLevel: number;
  // @ApiProperty({
  //   example: 1,
  //   description: '마지막 동기화 시간',
  // })
  // public LastBatteryLevel: number;
  // @ApiProperty({
  //   example: 1,
  //   description: '마지막 볼륨 레벨',
  // })
  // public AccuBattery: number;

  @ApiProperty({
    example: 10.3,
    description: '충전기의 X좌표',
  })
  public ChargeX: number;

  @ApiProperty({
    example: 11.3,
    description: '충전기의 X좌표',
  })
  public ChargeY: number;

  @ApiProperty({
    example: 9.3,
    description: '충전기의 X좌표',
  })
  public ChargeZ: number;

  @ApiProperty({
    example: '인입용',
    description: '인입용, 인출용 구분',
  })
  distinguish: string;
}

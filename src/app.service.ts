import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * * * * * * *
   * | | | | | |
   * | | | | | day of week
   * | | | | months
   * | | | day of month
   * | | hours
   * | minutes
   * seconds (optional)
   */
  // scheduler를 태스트 하기 위한 것
  // @Cron('10 * * * * *')
  // handleCron() {
  //   console.log('Called when the current second is 10');
  // }
}

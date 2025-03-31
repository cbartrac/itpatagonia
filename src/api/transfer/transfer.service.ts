import { Injectable } from '@nestjs/common';
import { TransferRepository } from './transfer.repository';

@Injectable()
export class TransferService {
  constructor(private transferRepository: TransferRepository) {}

  async getLastMonthCompanies(): Promise<any> {
    return await this.transferRepository.findLastMonthCompanies();
  }
}

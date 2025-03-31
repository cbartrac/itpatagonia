import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async getLastMonthRecords(): Promise<any> {
    return await this.companyRepository.findLastMonthRecords();
  }

  async create(companyDto): Promise<any> {
    return await this.companyRepository.create(companyDto);
  }
}

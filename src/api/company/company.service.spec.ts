import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { Company } from './company.schema';

describe('CompanyService', () => {
  let companyService: CompanyService;
  let companyRepository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const mockCompanyRepository = {
      create: jest.fn(),
      findLastMonthRecords: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: CompanyRepository, useValue: mockCompanyRepository },
      ],
    }).compile();

    companyService = app.get<CompanyService>(CompanyService);
    companyRepository = app.get<CompanyRepository>(CompanyRepository) as jest.Mocked<CompanyRepository>;
  });

  describe('create', () => {
    it('should create a company successfully', async () => {
      const companyDto = { companyName: 'Test Company', CUIT: 20122671349 };
      const createdCompany = { _id: new ObjectId('67eaaf3db410b8161fc5b684'), ...companyDto} as unknown as HydratedDocument<Company>;

      companyRepository.create.mockResolvedValue(createdCompany);

      const result = await companyService.create(companyDto);

      expect(companyRepository.create).toHaveBeenCalledWith(companyDto);
      expect(result).toEqual(createdCompany);
    });
  });

  describe('getLastMonthRecords', () => {
    it('should return companies from the last month', async () => {
      const lastMonthCompanies = [
        { _id: new ObjectId('67eaaf3db410b8161fc5b684'), companyName: 'Company A', CUIT: 20122671349 },
        { _id: new ObjectId('67eaaf3db410b8161fc5b685'), companyName: 'Company B', CUIT: 20357926603 },
      ];

      companyRepository.findLastMonthRecords.mockResolvedValue(lastMonthCompanies);

      const result = await companyService.getLastMonthRecords();

      expect(companyRepository.findLastMonthRecords).toHaveBeenCalled();
      expect(result).toEqual(lastMonthCompanies);
    });
  });
});
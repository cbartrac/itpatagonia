import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';

import { TransferService } from './transfer.service';
import { TransferRepository } from './transfer.repository';

describe('TransferService', () => {
  let transferService: TransferService;
  let transferRepository: jest.Mocked<TransferRepository>;

  beforeEach(async () => {
    const mockTransferRepository = {
      create: jest.fn(),
      findLastMonthCompanies: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransferService,
        { provide: TransferRepository, useValue: mockTransferRepository },
      ],
    }).compile();

    transferService = app.get<TransferService>(TransferService);
    transferRepository = app.get<TransferRepository>(TransferRepository) as jest.Mocked<TransferRepository>;
  });

  describe('getLastMonthCompanies', () => {
    it('should return companies which have done transfers the last month', async () => {
      const lastMonthCompanies = [
        { 
          _id: new ObjectId('67eaaf3db410b8161fc5b684'), 
          amount:123, 
          companyId: new ObjectId('67eaaf3db410b8161fc5b685'), 
          debitAccount:false, 
          creditAccount:true, 
          createdAt:'2025-01-31T14:13:32.779+00:00', 
          updatedAt:'2025-01-31T14:13:32.779+00:00' 
        }, 
        { 
          _id: new ObjectId('67eaaf3db410b8161fc5b686'), 
          amount:321, 
          companyId: new ObjectId('67eaaf3db410b8161fc5b687'), 
          debitAccount:true, 
          creditAccount:false, 
          createdAt:'2025-01-31T14:13:32.779+00:00', 
          updatedAt:'2025-01-31T14:13:32.779+00:00' 
        },
      ];

      transferRepository.findLastMonthCompanies.mockResolvedValue(lastMonthCompanies);

      const result = await transferService.getLastMonthCompanies();

      expect(transferRepository.findLastMonthCompanies).toHaveBeenCalled();
      expect(result).toEqual(lastMonthCompanies);
    });
  });
});
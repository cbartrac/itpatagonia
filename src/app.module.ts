import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompanyController } from './api/company/company.controller';
import { CompanyService } from './api/company/company.service';
import { CompanyRepository } from './api/company/company.repository';
import { CompanySchema } from './api/company/company.schema';

import { TransferController } from './api/transfer/transfer.controller';
import { TransferService } from './api/transfer/transfer.service';
import { TransferRepository } from './api/transfer/transfer.repository';
import { TransferSchema } from './api/transfer/transfer.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'itpatagonia'}),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: 'Transfer', schema: TransferSchema }]),
  ],
  controllers: [
    CompanyController,
    TransferController
  ],
  providers: [
    CompanyService, 
    TransferService, 
    CompanyRepository,
    TransferRepository
  ],
})
export class AppModule {}
